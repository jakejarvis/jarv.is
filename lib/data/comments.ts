import "server-only";
import { desc, eq } from "drizzle-orm";
import { cacheLife, cacheTag } from "next/cache";

import { db } from "@/lib/db";
import * as schema from "@/lib/db/schema";

/** The public profile fields of a commenter (also used for the signed-in user in comment UI) */
export type CommentUser = Pick<typeof schema.user.$inferSelect, "id" | "name" | "image">;

export type CommentWithUser = typeof schema.comment.$inferSelect & {
  user: CommentUser;
};

/** Cache tag for a single page's comments; expired by the actions in lib/server/comments.ts */
export const commentsTag = (pageSlug: string) => `comments-${pageSlug}`;

/**
 * Shared across server instances since it's read at request time (inside dynamic holes), not at prerender. Throws on
 * failure so an error is never cached -- only safe because it never runs during prerender, where a throw inside
 * "use cache" fails the build even if caught.
 */
const getCachedComments = async (pageSlug: string): Promise<CommentWithUser[]> => {
  "use cache: remote";
  cacheLife("hours");
  cacheTag(commentsTag(pageSlug));

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
};

/**
 * Retrieves all comments for a given slug, newest first, with each author's public profile fields
 */
export const getComments = async (pageSlug: string): Promise<CommentWithUser[]> => {
  try {
    return await getCachedComments(pageSlug);
  } catch (error) {
    console.error("[data/comments] error fetching comments:", error);
    return [];
  }
};

/**
 * Retrieves the number of comments for a given slug (shares getComments' cache entry)
 */
export const getCommentCount = async (pageSlug: string): Promise<number> => {
  const comments = await getComments(pageSlug);
  return comments.length;
};
