import { createServerFn } from "@tanstack/react-start";
import { getRequestHeaders } from "@tanstack/react-start/server";
import { eq } from "drizzle-orm";
import { z } from "zod";

import { auth } from "@/lib/auth.server";
import type { CommentWithUser } from "@/lib/comments";
import { getComments as getCommentsFromDb } from "@/lib/data/comments.server";
import { db } from "@/lib/db";
import * as schema from "@/lib/db/schema";
import { getPostByPageSlug } from "@/lib/posts";

const commentContentSchema = z.string().trim().min(1).max(10_000);
const commentIdSchema = z.uuid();

const getSession = () => auth.api.getSession({ headers: getRequestHeaders() });

/** A page's comments, newest first. Never cached, so a commenter always sees their own changes. */
export const getComments = createServerFn({ method: "GET" })
  .validator(z.string())
  .handler(async ({ data: pageSlug }): Promise<CommentWithUser[]> => {
    try {
      return await getCommentsFromDb(pageSlug);
    } catch (error) {
      console.error("[functions/comments] error fetching comments:", error);
      throw new Error("Failed to fetch comments", { cause: error });
    }
  });

export const createComment = createServerFn({ method: "POST" })
  .validator(
    z.object({
      content: commentContentSchema,
      pageSlug: z.string(),
      parentId: commentIdSchema.optional(),
    }),
  )
  .handler(async ({ data: { content, pageSlug, parentId } }): Promise<void> => {
    const session = await getSession();

    if (!session || !session.user) {
      throw new Error("You must be logged in to comment");
    }

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
    } catch (error) {
      console.error("[functions/comments] error creating comment:", error);
      throw new Error("Failed to create comment", { cause: error });
    }
  });

export const updateComment = createServerFn({ method: "POST" })
  .validator(z.object({ commentId: commentIdSchema, content: commentContentSchema }))
  .handler(async ({ data: { commentId, content } }): Promise<void> => {
    const session = await getSession();

    if (!session || !session.user) {
      throw new Error("You must be logged in to update a comment");
    }

    try {
      // Get the comment to verify ownership
      const comment = await db
        .select({ userId: schema.comment.userId })
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
    } catch (error) {
      console.error("[functions/comments] error updating comment:", error);
      throw new Error("Failed to update comment", { cause: error });
    }
  });

export const deleteComment = createServerFn({ method: "POST" })
  .validator(commentIdSchema)
  .handler(async ({ data: commentId }): Promise<void> => {
    const session = await getSession();

    if (!session || !session.user) {
      throw new Error("You must be logged in to delete a comment");
    }

    try {
      // Get the comment to verify ownership
      const comment = await db
        .select({ userId: schema.comment.userId })
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
    } catch (error) {
      console.error("[functions/comments] error deleting comment:", error);
      throw new Error("Failed to delete comment", { cause: error });
    }
  });
