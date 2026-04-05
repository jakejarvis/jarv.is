import { createFileRoute } from "@tanstack/react-router";
import siteConfig from "@/lib/config/site";

export const Route = createFileRoute("/manifest/webmanifest")({
  server: {
    handlers: {
      GET: async () => {
        const manifest = {
          name: siteConfig.name,
          short_name: siteConfig.name,
          description: siteConfig.description,
          lang: "en-US",
          icons: [
            {
              src: "/icon.png",
              sizes: "any",
              type: "image/png",
            },
          ],
          display: "browser",
          start_url: "/",
        };

        return Response.json(manifest, {
          headers: {
            "content-type":
              "application/manifest+json; charset=utf-8",
          },
        });
      },
    },
  },
});
