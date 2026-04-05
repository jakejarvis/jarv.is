import { createServerFn } from "@tanstack/react-start";
import { getRequest } from "@tanstack/react-start/server";
import { desc, eq, sql } from "drizzle-orm";
import { z } from "zod";

import { auth } from "@/lib/auth";
import { db } from "@/lib/db";
import * as schema from "@/lib/db/schema";

export type CommentWithUser = typeof schema.comment.$inferSelect & {
  user: Pick<typeof schema.user.$inferSelect, "id" | "name" | "image">;
};

export const getComments = createServerFn()
  .inputValidator(z.object({ pageSlug: z.string() }))
  .handler(async ({ data }): Promise<CommentWithUser[]> => {
    try {
      const commentsWithUsers = await db
        .select()
        .from(schema.comment)
        .innerJoin(schema.user, eq(schema.comment.userId, schema.user.id))
        .where(eq(schema.comment.pageSlug, data.pageSlug))
        .orderBy(desc(schema.comment.createdAt));

      return commentsWithUsers.map(({ comment, user }) => ({
        ...comment,
        user: {
          id: user.id,
          name: user.name,
          image: user.image,
        },
      }));
    } catch (error) {
      console.error("[server/comments] error fetching comments:", error);
      return [];
    }
  });

/**
 * Retrieves the number of comments for a given slug
 */
export const getCommentCount = createServerFn()
  .inputValidator(z.object({ slug: z.string() }))
  .handler(async ({ data }) => {
    try {
      const result = await db
        .select({
          count: sql<number>`cast(count(${schema.comment.id}) as int)`,
        })
        .from(schema.comment)
        .where(eq(schema.comment.pageSlug, data.slug));

      return Number(result[0]?.count ?? 0);
    } catch (error) {
      console.error("[server/comments] error fetching comment count:", error);
      return 0;
    }
  });

/**
 * Retrieves the numbers of comments for ALL slugs
 */
export const getAllCommentCounts = createServerFn().handler(async () => {
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
      map[row.pageSlug] = Number(row.count ?? 0);
    }
    return map;
  } catch (error) {
    console.error("[server/comments] error fetching comment counts:", error);
    return {};
  }
});

const getSession = async () => {
  const request = getRequest();
  const session = await auth.api.getSession({
    headers: request.headers,
  });
  if (!session?.user) {
    throw new Error("You must be logged in");
  }
  return session;
};

export const createComment = createServerFn({ method: "POST" })
  .inputValidator(
    z.object({
      content: z.string(),
      pageSlug: z.string(),
      parentId: z.string().optional(),
    }),
  )
  .handler(async ({ data }) => {
    const session = await getSession();

    try {
      await db.insert(schema.comment).values({
        content: data.content,
        pageSlug: data.pageSlug,
        parentId: data.parentId || null,
        userId: session.user.id,
      });
    } catch (error) {
      console.error("[server/comments] error creating comment:", error);
      throw new Error("Failed to create comment");
    }
  });

export const updateComment = createServerFn({ method: "POST" })
  .inputValidator(
    z.object({
      commentId: z.string(),
      content: z.string(),
    }),
  )
  .handler(async ({ data }) => {
    const session = await getSession();

    try {
      const comment = await db
        .select({
          userId: schema.comment.userId,
          pageSlug: schema.comment.pageSlug,
        })
        .from(schema.comment)
        .where(eq(schema.comment.id, data.commentId))
        .then((results) => results[0]);

      if (!comment) {
        throw new Error("Comment not found");
      }

      if (comment.userId !== session.user.id) {
        throw new Error("You can only edit your own comments");
      }

      await db
        .update(schema.comment)
        .set({
          content: data.content,
          updatedAt: new Date(),
        })
        .where(eq(schema.comment.id, data.commentId));
    } catch (error) {
      console.error("[server/comments] error updating comment:", error);
      throw new Error("Failed to update comment");
    }
  });

export const deleteComment = createServerFn({ method: "POST" })
  .inputValidator(z.object({ commentId: z.string() }))
  .handler(async ({ data }) => {
    const session = await getSession();

    try {
      const comment = await db
        .select({
          userId: schema.comment.userId,
          pageSlug: schema.comment.pageSlug,
        })
        .from(schema.comment)
        .where(eq(schema.comment.id, data.commentId))
        .then((results) => results[0]);

      if (!comment) {
        throw new Error("Comment not found");
      }

      if (comment.userId !== session.user.id) {
        throw new Error("You can only delete your own comments");
      }

      await db.delete(schema.comment).where(eq(schema.comment.id, data.commentId));
    } catch (error) {
      console.error("[server/comments] error deleting comment:", error);
      throw new Error("Failed to delete comment");
    }
  });
