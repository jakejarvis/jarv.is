import "server-only";
import { sql } from "drizzle-orm";
import { cacheLife, cacheTag } from "next/cache";

import { db } from "@/lib/db";
import { comment, page } from "@/lib/db/schema";

export type PostStatsData = {
  views: Record<string, number>;
  comments: Record<string, number>;
};

/**
 * View and comment counts for ALL pages, keyed by slug (e.g. "notes/dark-mode").
 * Cached briefly; invalidated by `revalidateTag("views")` / `revalidateTag("comments")`.
 */
export const getPostStats = async (): Promise<PostStatsData> => {
  "use cache";
  cacheLife("minutes");
  cacheTag("views", "comments");

  try {
    const [pageRows, commentRows] = await Promise.all([
      db.select({ slug: page.slug, views: page.views }).from(page),
      db
        .select({
          pageSlug: comment.pageSlug,
          count: sql<number>`cast(count(${comment.id}) as int)`,
        })
        .from(comment)
        .groupBy(comment.pageSlug),
    ]);

    return {
      views: Object.fromEntries(pageRows.map((row) => [row.slug, row.views])),
      comments: Object.fromEntries(commentRows.map((row) => [row.pageSlug, row.count])),
    };
  } catch (error) {
    console.error("[data/stats] error fetching post stats:", error);
    return { views: {}, comments: {} };
  }
};
