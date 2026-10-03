"use server";

import { eq } from "drizzle-orm";
import { revalidatePath, revalidateTag } from "next/cache";
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

    // Revalidate page and the cached comment counts
    revalidatePath(`/${pageSlug}`);
    revalidateTag("comments", "max");
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

    // Revalidate page and the cached comment counts
    revalidatePath(`/${comment.pageSlug}`);
    revalidateTag("comments", "max");
  } catch (error) {
    console.error("[server/comments] error deleting comment:", error);
    throw new Error("Failed to delete comment", { cause: error });
  }
};
