import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/robots.txt")({
  server: {
    handlers: {
      GET: () =>
        new Response(
          [
            "User-Agent: *",
            "Disallow: /api/",
            "Disallow: /404",
            "Disallow: /500",
            "",
            `Sitemap: ${import.meta.env.VITE_BASE_URL}/sitemap.xml`,
            "",
          ].join("\n"),
          { headers: { "content-type": "text/plain; charset=utf-8" } },
        ),
    },
  },
});
