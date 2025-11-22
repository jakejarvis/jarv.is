"use server";

import { sql } from "drizzle-orm";
import { revalidateTag } from "next/cache";
import { db } from "@/lib/db";
import { page } from "@/lib/db/schema";

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

    // Invalidate the views cache so getViewCounts returns fresh data
    // This is safe here because this entire file is marked "use server"
    revalidateTag("views", "max");

    return result.views;
  } catch (error) {
    console.error("[actions/views] error incrementing views:", error);
    throw new Error("Failed to increment views");
  }
};
