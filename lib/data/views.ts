import "server-only";
import { db } from "@/lib/db";
import { page } from "@/lib/db/schema";

/**
 * Retrieves the numbers of views for ALL slugs (uncached)
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
    console.error("[data/views] fatal error:", error);
    return {};
  }
};
