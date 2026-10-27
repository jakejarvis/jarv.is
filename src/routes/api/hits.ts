import { createFileRoute } from "@tanstack/react-router";

import { getPostStats } from "@/lib/data/stats.server";

type HitsResponse = {
  total: {
    hits: number;
  };
  pages: Array<{
    slug: string;
    hits: number;
  }>;
};

export const Route = createFileRoute("/api/hits")({
  server: {
    handlers: {
      GET: async (): Promise<Response> => {
        // note: while hits have been renamed to views in most places, this API shouldn't change due to it being snapshotted
        const { views } = await getPostStats();

        const total = {
          hits: Object.values(views).reduce((acc, curr) => acc + curr, 0),
        };
        const pages = Object.entries(views).map(([slug, count]) => ({
          slug,
          hits: count,
        }));

        pages.sort((a, b) => b.hits - a.hits);

        return Response.json({ total, pages } satisfies HitsResponse, {
          headers: {
            "Cache-Control": "public, max-age=0, must-revalidate",
            "Vercel-CDN-Cache-Control": "public, max-age=60, stale-while-revalidate=600",
          },
        });
      },
    },
  },
});
