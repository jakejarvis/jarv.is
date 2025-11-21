"use server";

import { headers } from "next/headers";
import { revalidatePath, revalidateTag } from "next/cache";
import { eq, desc, inArray, sql } from "drizzle-orm";
import { checkBotId } from "botid/server";
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
    // Return empty array instead of throwing during prerendering
    return [];
  }
};

export const getCommentCounts: {
  /**
   * Retrieves the number of comments for a given slug
   */
  (slug: string): Promise<number>;
  /**
   * Retrieves the numbers of comments for an array of slugs
   */
  (slug: string[]): Promise<Record<string, number>>;
  /**
   * Retrieves the numbers of comments for ALL slugs
   */
  (): Promise<Record<string, number>>;
} = async (
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  slug?: any
): // eslint-disable-next-line @typescript-eslint/no-explicit-any
Promise<any> => {
  try {
    // return one page
    if (typeof slug === "string") {
      const result = await db
        .select({
          count: sql<number>`cast(count(${schema.comment.id}) as int)`,
        })
        .from(schema.comment)
        .where(eq(schema.comment.pageSlug, slug));

      return Number(result[0]?.count ?? 0);
    }

    // return multiple pages
    if (Array.isArray(slug)) {
      const rows = await db
        .select({
          pageSlug: schema.comment.pageSlug,
          count: sql<number>`cast(count(${schema.comment.id}) as int)`,
        })
        .from(schema.comment)
        .where(inArray(schema.comment.pageSlug, slug))
        .groupBy(schema.comment.pageSlug);

      const map: Record<string, number> = Object.fromEntries(slug.map((s: string) => [s, 0]));
      for (const row of rows) {
        map[row.pageSlug] = Number(row.count ?? 0);
      }
      return map;
    }

    // return ALL pages
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
    // Return sensible defaults instead of throwing during prerendering
    if (typeof slug === "string") return 0;
    if (Array.isArray(slug)) return Object.fromEntries(slug.map((s: string) => [s, 0]));
    return {};
  }
};

export const createComment = async (data: { content: string; pageSlug: string; parentId?: string }) => {
  // BotID server-side verification
  const verification = await checkBotId();
  if (verification.isBot) {
    console.warn("[server/comments] botid verification failed:", verification);
    throw new Error("Bot check failed 🤖");
  }

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

    // Revalidate caches and paths
    revalidateTag("comments", "max");
    revalidateTag(`comments-${data.pageSlug}`, "max");
    revalidatePath(`/${data.pageSlug}`);
    // Also revalidate the notes listing to update comment count badges
    revalidatePath("/notes");
  } catch (error) {
    console.error("[server/comments] error creating comment:", error);
    throw new Error("Failed to create comment");
  }
};

export const updateComment = async (commentId: string, content: string) => {
  // BotID server-side verification
  const verification = await checkBotId();
  if (verification.isBot) {
    console.warn("[server/comments] botid verification failed:", verification);
    throw new Error("Bot check failed 🤖");
  }

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

    // Revalidate caches and paths
    revalidateTag("comments", "max");
    revalidateTag(`comments-${comment.pageSlug}`, "max");
    revalidatePath(`/${comment.pageSlug}`);
    // Also revalidate the notes listing to update comment count badges
    // TODO: make this more generic in case we want to add comments to non-note pages
    revalidatePath("/notes");
  } catch (error) {
    console.error("[server/comments] error updating comment:", error);
    throw new Error("Failed to update comment");
  }
};

export const deleteComment = async (commentId: string) => {
  // BotID server-side verification
  const verification = await checkBotId();
  if (verification.isBot) {
    console.warn("[server/comments] botid verification failed:", verification);
    throw new Error("Bot check failed 🤖");
  }

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

    // Revalidate caches and paths
    revalidateTag("comments", "max");
    revalidateTag(`comments-${comment.pageSlug}`, "max");
    revalidatePath(`/${comment.pageSlug}`);
    // Also revalidate the notes listing to update comment count badges
    // TODO: make this more generic in case we want to add comments to non-note pages
    revalidatePath("/notes");
  } catch (error) {
    console.error("[server/comments] error deleting comment:", error);
    throw new Error("Failed to delete comment");
  }
};
