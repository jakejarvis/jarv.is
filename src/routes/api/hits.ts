import { createFileRoute } from "@tanstack/react-router";

import { getAllViewCounts } from "@/lib/server/views";

export const Route = createFileRoute("/api/hits")({
  server: {
    handlers: {
      GET: async () => {
        const views = await getAllViewCounts();

        const total = {
          hits: Object.values(views).reduce((acc, curr) => acc + curr, 0),
        };
        const pages = Object.entries(views).map(([slug, views]) => ({
          slug,
          hits: views,
        }));

        pages.sort((a, b) => b.hits - a.hits);

        return Response.json({ total, pages });
      },
    },
  },
});
