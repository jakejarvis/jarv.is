"use server";

import { headers } from "next/headers";
import { revalidatePath } from "next/cache";
import { eq, desc } from "drizzle-orm";
import { db } from "@/lib/db";
import * as schema from "@/lib/db/schema";
import { auth } from "@/lib/auth";

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

    return commentsWithUsers.map(({ comment, user }) => ({
      ...comment,
      user: {
        // we're namely worried about keeping the user's email private here, but nothing sensitive is stored in the db
        id: user.id,
        name: user.name,
        image: user.image,
      },
    }));
  } catch (error) {
    console.error("[server/comments] error fetching comments:", error);
    throw new Error("Failed to fetch comments");
  }
};

export const createComment = async (data: { content: string; pageSlug: string; parentId?: string }) => {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session || !session.user) {
    throw new Error("You must be logged in to comment");
  }

  try {
    // Insert the comment
    await db.insert(schema.comment).values({
      content: data.content,
      pageSlug: data.pageSlug,
      parentId: data.parentId || null,
      userId: session.user.id,
    });

    // Revalidate the page to show the new comment
    revalidatePath(`/${data.pageSlug}`);
  } catch (error) {
    console.error("[server/comments] error creating comment:", error);
    throw new Error("Failed to create comment");
  }
};

export const updateComment = async (commentId: string, content: string) => {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session || !session.user) {
    throw new Error("You must be logged in to update a comment");
  }

  try {
    // Get the comment to verify ownership
    const comment = await db
      .select({ userId: schema.comment.userId, pageSlug: schema.comment.pageSlug })
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
        content,
        updatedAt: new Date(),
      })
      .where(eq(schema.comment.id, commentId));

    // Revalidate the page to show the updated comment
    revalidatePath(`/${comment.pageSlug}`);
  } catch (error) {
    console.error("[server/comments] error updating comment:", error);
    throw new Error("Failed to update comment");
  }
};

export const deleteComment = async (commentId: string) => {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session || !session.user) {
    throw new Error("You must be logged in to delete a comment");
  }

  try {
    // Get the comment to verify ownership and get the page_slug for revalidation
    const comment = await db
      .select({ userId: schema.comment.userId, pageSlug: schema.comment.pageSlug })
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

    // Revalidate the page to update the comments list
    revalidatePath(`/${comment.pageSlug}`);
  } catch (error) {
    console.error("[server/comments] error deleting comment:", error);
    throw new Error("Failed to delete comment");
  }
};
