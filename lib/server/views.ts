import "server-only";

import { cache } from "react";
import { eq, inArray } from "drizzle-orm";
import { db } from "@/lib/db";
import { page } from "@/lib/db/schema";

export const incrementViews = async (slug: string): Promise<number> => {
  try {
    // First, try to find the existing record
    const existingHit = await db.select().from(page).where(eq(page.slug, slug)).limit(1);

    if (existingHit.length === 0) {
      // Create new record if it doesn't exist
      await db.insert(page).values({ slug, views: 1 }).execute();

      return 1; // New record starts with 1 hit
    } else {
      // Calculate new hit count
      const newViewCount = existingHit[0].views + 1;

      // Update existing record by incrementing hits
      await db.update(page).set({ views: newViewCount }).where(eq(page.slug, slug)).execute();

      return newViewCount;
    }
  } catch (error) {
    console.error("[view-counter] fatal error:", error);
    throw new Error("Failed to increment views");
  }
};

export const getViews: {
  /**
   * Retrieves the number of views for a given slug, or null if the slug does not exist
   */
  (slug: string): Promise<number | null>;
  /**
   * Retrieves the numbers of views for an array of slugs
   */
  (slug: string[]): Promise<Record<string, number | null>>;
  /**
   * Retrieves the numbers of views for ALL slugs
   */
  (): Promise<Record<string, number>>;
} = cache(
  async (
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    slug?: any
  ): // eslint-disable-next-line @typescript-eslint/no-explicit-any
  Promise<any> => {
    try {
      // return one page
      if (typeof slug === "string") {
        const pages = await db.select().from(page).where(eq(page.slug, slug)).limit(1);
        return pages[0].views;
      }

      // return multiple pages
      if (Array.isArray(slug)) {
        const pages = await db.select().from(page).where(inArray(page.slug, slug));
        return pages.reduce(
          (acc, page, index) => {
            acc[slug[index]] = page.views;
            return acc;
          },
          {} as Record<string, number | null>
        );
      }

      // return ALL pages
      const pages = await db.select().from(page);
      return pages.reduce(
        (acc, page) => {
          acc[page.slug] = page.views;
          return acc;
        },
        {} as Record<string, number>
      );
    } catch (error) {
      console.error("[server/views] fatal error:", error);
      throw new Error("Failed to get views");
    }
  }
);
