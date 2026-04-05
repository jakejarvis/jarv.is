import { createFileRoute } from "@tanstack/react-router";
import { env } from "cloudflare:workers";

export const Route = createFileRoute("/robots.txt")({
  server: {
    handlers: {
      GET: async () => {
        const content = [
          "User-agent: *",
          "Disallow: /api/",
          "Disallow: /404",
          "Disallow: /500",
          "",
          `Sitemap: ${env.VITE_BASE_URL || "https://jarv.is"}/sitemap.xml`,
        ].join("\n");

        return new Response(content, {
          headers: { "content-type": "text/plain; charset=utf-8" },
        });
      },
    },
  },
});
