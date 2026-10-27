import { createServerFn } from "@tanstack/react-start";
import { setResponseHeaders } from "@tanstack/react-start/server";

import { getPostStats as getPostStatsFromDb, type PostStatsData } from "@/lib/data/stats.server";

/** View and comment counts for every post. Cached by Vercel's CDN for a minute (views can lag a little). */
export const getPostStats = createServerFn({ method: "GET" }).handler(
  async (): Promise<PostStatsData> => {
    setResponseHeaders(
      new Headers({
        "Cache-Control": "public, max-age=0, must-revalidate",
        "Vercel-CDN-Cache-Control": "public, max-age=60, stale-while-revalidate=600",
      }),
    );
    return getPostStatsFromDb();
  },
);
