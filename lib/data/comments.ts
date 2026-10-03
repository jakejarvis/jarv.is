import "server-only";
import { desc, eq, sql } from "drizzle-orm";

import { db } from "@/lib/db";
import * as schema from "@/lib/db/schema";

/** The public profile fields of a commenter (also used for the signed-in user in comment UI) */
export type CommentUser = Pick<typeof schema.user.$inferSelect, "id" | "name" | "image">;

export type CommentWithUser = typeof schema.comment.$inferSelect & {
  user: CommentUser;
};

/**
 * Retrieves all comments for a given slug, newest first, with each author's public profile fields
 */
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
    console.error("[data/comments] error fetching comments:", error);
    // Return empty array instead of throwing during prerendering
    return [];
  }
};

/**
 * Retrieves the number of comments for a given slug (uncached -- call from inside a <Suspense> boundary)
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
    console.error("[data/comments] error fetching comment count:", error);
    return 0;
  }
};
