"use server";

import { eq, sql } from "drizzle-orm";
import { revalidateTag } from "next/cache";

import { db } from "@/lib/db";
import { page } from "@/lib/db/schema";

/**
 * Retrieves the number of views for a given slug, or 0 if the slug does not exist or on error
 */
export const getViewCount = async (slug: string): Promise<number> => {
  try {
    const pages = await db.select().from(page).where(eq(page.slug, slug)).limit(1);
    return pages[0]?.views ?? 0;
  } catch (error) {
    console.error("[server/views] fatal error:", error);
    return 0;
  }
};

/**
 * Retrieves the numbers of views for ALL slugs
 */
export const getAllViewCounts = async (): Promise<Record<string, number>> => {
  try {
    const pages = await db.select().from(page);
    return pages.reduce(
      (acc, p) => {
        acc[p.slug] = p.views;
        return acc;
      },
      {} as Record<string, number>,
    );
  } catch (error) {
    console.error("[server/views] fatal error:", error);
    return {};
  }
};

/**
 * Increments the view count for a given slug (upserts if doesn't exist)
 */
export const incrementViews = async (slug: string): Promise<number> => {
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

    // Invalidate the views cache so getViewCount returns fresh data
    revalidateTag("views", "max");

    return result.views;
  } catch (error) {
    console.error("[server/views] error incrementing views:", error);
    throw new Error("Failed to increment views", { cause: error });
  }
};
