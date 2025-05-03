import { env } from "@/lib/env";
import siteConfig from "@/lib/config/site";
import type { MetadataRoute } from "next";

const manifest = (): MetadataRoute.Manifest => {
  return {
    name: siteConfig.name,
    // eslint-disable-next-line camelcase
    short_name: siteConfig.name,
    description: siteConfig.description,
    lang: env.NEXT_PUBLIC_SITE_LOCALE,
    icons: [
      {
        src: "/icon.png",
        sizes: "any",
        type: "image/png",
      },
    ],
    display: "browser",
    // eslint-disable-next-line camelcase
    start_url: "/",
  };
};

export default manifest;
