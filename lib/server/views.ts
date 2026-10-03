"use server";

import { sql } from "drizzle-orm";
import { revalidateTag } from "next/cache";

import { db } from "@/lib/db";
import { page } from "@/lib/db/schema";
import { getPostByPageSlug } from "@/lib/posts";

/**
 * Increments the view count for a given slug (upserts if doesn't exist)
 */
export const incrementViews = async (slug: string): Promise<number> => {
  // this is a public endpoint: only count views for posts that actually exist
  if (typeof slug !== "string" || !getPostByPageSlug(slug)) {
    throw new Error("Invalid slug");
  }

  try {
    // Atomic upsert: insert new row with views=1, or increment existing row
    const [result] = await db
      .insert(page)
      .values({ slug, views: 1 })
      .onConflictDoUpdate({
        target: page.slug,
        set: { views: sql`${page.views} + 1` },
      })
      .returning({ views: page.views });

    // Mark the cached post stats (lib/data/stats.ts) stale so lists pick up the new count
    revalidateTag("views", "max");

    return result.views;
  } catch (error) {
    console.error("[server/views] error incrementing views:", error);
    throw new Error("Failed to increment views", { cause: error });
  }
};
