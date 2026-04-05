import { createServerFn } from "@tanstack/react-start";
import { eq, sql } from "drizzle-orm";
import { z } from "zod";

import { db } from "@/lib/db";
import { page } from "@/lib/db/schema";

/**
 * Retrieves the number of views for a given slug
 */
export const getViewCount = createServerFn()
  .inputValidator(z.object({ slug: z.string() }))
  .handler(async ({ data }) => {
    try {
      const pages = await db.select().from(page).where(eq(page.slug, data.slug)).limit(1);
      return pages[0]?.views ?? 0;
    } catch (error) {
      console.error("[server/views] fatal error:", error);
      return 0;
    }
  });

/**
 * Retrieves the numbers of views for ALL slugs
 */
export const getAllViewCounts = createServerFn().handler(async () => {
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
});

/**
 * Increments the view count for a given slug (upserts if doesn't exist)
 */
export const incrementViews = createServerFn({ method: "POST" })
  .inputValidator(z.object({ slug: z.string() }))
  .handler(async ({ data }) => {
    try {
      const [result] = await db
        .insert(page)
        .values({ slug: data.slug, views: 1 })
        .onConflictDoUpdate({
          target: page.slug,
          set: { views: sql`${page.views} + 1` },
        })
        .returning({ views: page.views });

      return result.views;
    } catch (error) {
      console.error("[server/views] error incrementing views:", error);
      throw new Error("Failed to increment views");
    }
  });
