import "server-only";

import { eq, inArray } from "drizzle-orm";
import { cacheTag } from "next/cache";
import { db } from "@/lib/db";
import { page } from "@/lib/db/schema";

export const getViewCounts: {
  /**
   * Retrieves the number of views for a given slug, or 0 if the slug does not exist or on error
   */
  (slug: string): Promise<number>;
  /**
   * Retrieves the numbers of views for an array of slugs, returning 0 for any that don't exist
   */
  (slug: string[]): Promise<Record<string, number>>;
  /**
   * Retrieves the numbers of views for ALL slugs
   */
  (): Promise<Record<string, number>>;
} = (async (slug?: string | string[]) => {
  "use cache";
  cacheTag("views");

  try {
    // return one page
    if (typeof slug === "string") {
      const pages = await db.select().from(page).where(eq(page.slug, slug)).limit(1);
      return pages[0]?.views ?? 0; // Return 0 if no row found
    }

    // return multiple pages
    if (Array.isArray(slug)) {
      const pages = await db.select().from(page).where(inArray(page.slug, slug));
      const viewMap: Record<string, number> = Object.fromEntries(slug.map((s) => [s, 0]));
      for (const p of pages) {
        viewMap[p.slug] = p.views;
      }
      return viewMap;
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
    // Return sensible defaults instead of throwing during prerendering
    if (typeof slug === "string") return 0;
    if (Array.isArray(slug)) return Object.fromEntries(slug.map((s) => [s, 0]));
    return {};
  }
}) as typeof getViewCounts;
