"use server";

import { desc, eq, sql } from "drizzle-orm";
import { revalidatePath } from "next/cache";
import { headers } from "next/headers";
import { z } from "zod";

import { auth } from "@/lib/auth";
import { db } from "@/lib/db";
import * as schema from "@/lib/db/schema";
import { getPostByPageSlug } from "@/lib/posts";

const commentContentSchema = z.string().trim().min(1).max(10_000);
const commentIdSchema = z.uuid();

const createCommentSchema = z.object({
  content: commentContentSchema,
  pageSlug: z.string(),
  parentId: commentIdSchema.optional(),
});

export type CommentWithUser = typeof schema.comment.$inferSelect & {
  user: Pick<typeof schema.user.$inferSelect, "id" | "name" | "image">;
};

export const getComments = async (pageSlug: string): Promise<CommentWithUser[]> => {
  try {
    // Fetch all comments for the page with user details
    const commentsWithUsers = await db
      .select()
      .from(schema.comment)
      .innerJoin(schema.user, eq(schema.comment.userId, schema.user.id))
      .where(eq(schema.comment.pageSlug, pageSlug))
      .orderBy(desc(schema.comment.createdAt));

    return commentsWithUsers.map(({ comment, user }) =>
      Object.assign(comment, {
        user: {
          // we're namely worried about keeping the user's email private here, but nothing sensitive is stored in the db
          id: user.id,
          name: user.name,
          image: user.image,
        },
      }),
    );
  } catch (error) {
    console.error("[server/comments] error fetching comments:", error);
    // Return empty array instead of throwing during prerendering
    return [];
  }
};

/**
 * Retrieves the number of comments for a given slug
 */
export const getCommentCount = async (slug: string): Promise<number> => {
  try {
    const result = await db
      .select({
        count: sql<number>`cast(count(${schema.comment.id}) as int)`,
      })
      .from(schema.comment)
      .where(eq(schema.comment.pageSlug, slug));

    return result[0]?.count ?? 0;
  } catch (error) {
    console.error("[server/comments] error fetching comment count:", error);
    return 0;
  }
};

/**
 * Retrieves the numbers of comments for ALL slugs
 */
export const getAllCommentCounts = async (): Promise<Record<string, number>> => {
  try {
    const rows = await db
      .select({
        pageSlug: schema.comment.pageSlug,
        count: sql<number>`cast(count(${schema.comment.id}) as int)`,
      })
      .from(schema.comment)
      .groupBy(schema.comment.pageSlug);

    const map: Record<string, number> = {};
    for (const row of rows) {
      map[row.pageSlug] = row.count ?? 0;
    }
    return map;
  } catch (error) {
    console.error("[server/comments] error fetching comment counts:", error);
    return {};
  }
};

export const createComment = async (data: {
  content: string;
  pageSlug: string;
  parentId?: string;
}) => {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session || !session.user) {
    throw new Error("You must be logged in to comment");
  }

  const parsed = createCommentSchema.safeParse(data);
  if (!parsed.success) {
    throw new Error("Invalid comment");
  }
  const { content, pageSlug, parentId } = parsed.data;

  // only allow comments on existing posts that haven't disabled them
  const post = getPostByPageSlug(pageSlug);
  if (!post || post.noComments) {
    throw new Error("Comments are closed for this page");
  }

  try {
    // Replies must point at an existing comment on the same page
    if (parentId) {
      const parent = await db
        .select({ pageSlug: schema.comment.pageSlug })
        .from(schema.comment)
        .where(eq(schema.comment.id, parentId))
        .then((results) => results[0]);

      if (!parent || parent.pageSlug !== pageSlug) {
        throw new Error("Parent comment not found");
      }
    }

    // Insert the comment
    await db.insert(schema.comment).values({
      content,
      pageSlug,
      parentId: parentId ?? null,
      userId: session.user.id,
    });

    // Revalidate page
    revalidatePath(`/${pageSlug}`);
  } catch (error) {
    console.error("[server/comments] error creating comment:", error);
    throw new Error("Failed to create comment", { cause: error });
  }
};

export const updateComment = async (commentId: string, content: string) => {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session || !session.user) {
    throw new Error("You must be logged in to update a comment");
  }

  const parsedId = commentIdSchema.safeParse(commentId);
  const parsedContent = commentContentSchema.safeParse(content);
  if (!parsedId.success || !parsedContent.success) {
    throw new Error("Invalid comment");
  }

  try {
    // Get the comment to verify ownership
    const comment = await db
      .select({
        userId: schema.comment.userId,
        pageSlug: schema.comment.pageSlug,
      })
      .from(schema.comment)
      .where(eq(schema.comment.id, commentId))
      .then((results) => results[0]);

    if (!comment) {
      throw new Error("Comment not found");
    }

    // Verify ownership
    if (comment.userId !== session.user.id) {
      throw new Error("You can only edit your own comments");
    }

    // Update the comment
    await db
      .update(schema.comment)
      .set({
        content: parsedContent.data,
        updatedAt: new Date(),
      })
      .where(eq(schema.comment.id, commentId));

    // Revalidate page
    revalidatePath(`/${comment.pageSlug}`);
  } catch (error) {
    console.error("[server/comments] error updating comment:", error);
    throw new Error("Failed to update comment", { cause: error });
  }
};

export const deleteComment = async (commentId: string) => {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session || !session.user) {
    throw new Error("You must be logged in to delete a comment");
  }

  if (!commentIdSchema.safeParse(commentId).success) {
    throw new Error("Invalid comment ID");
  }

  try {
    // Get the comment to verify ownership and get the page_slug for revalidation
    const comment = await db
      .select({
        userId: schema.comment.userId,
        pageSlug: schema.comment.pageSlug,
      })
      .from(schema.comment)
      .where(eq(schema.comment.id, commentId))
      .then((results) => results[0]);

    if (!comment) {
      throw new Error("Comment not found");
    }

    // Verify ownership
    if (comment.userId !== session.user.id) {
      throw new Error("You can only delete your own comments");
    }

    // Delete the comment
    await db.delete(schema.comment).where(eq(schema.comment.id, commentId));

    // Revalidate page
    revalidatePath(`/${comment.pageSlug}`);
  } catch (error) {
    console.error("[server/comments] error deleting comment:", error);
    throw new Error("Failed to delete comment", { cause: error });
  }
};
