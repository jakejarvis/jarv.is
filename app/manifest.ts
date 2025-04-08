import * as config from "../lib/config";
import type { MetadataRoute } from "next";

export const dynamic = "force-static";

const manifest = (): MetadataRoute.Manifest => {
  return {
    name: config.siteName,
    // eslint-disable-next-line camelcase
    short_name: config.siteName,
    description: config.longDescription,
    lang: config.siteLocale,
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
