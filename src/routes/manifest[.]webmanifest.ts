import { createFileRoute } from "@tanstack/react-router";

import siteConfig from "@/lib/config/site";

export const Route = createFileRoute("/manifest.webmanifest")({
  server: {
    handlers: {
      GET: () =>
        Response.json(
          {
            name: siteConfig.name,
            short_name: siteConfig.name,
            description: siteConfig.description,
            lang: import.meta.env.VITE_SITE_LOCALE,
            icons: [
              {
                src: "/icon.png",
                sizes: "any",
                type: "image/png",
              },
            ],
            display: "browser",
            start_url: "/",
          },
          { headers: { "content-type": "application/manifest+json; charset=utf-8" } },
        ),
    },
  },
});
