import * as config from "../lib/config";
import { SITE_LOCALE } from "../lib/config/constants";
import type { MetadataRoute } from "next";

const manifest = (): MetadataRoute.Manifest => {
  return {
    name: config.siteName,
    // eslint-disable-next-line camelcase
    short_name: config.siteName,
    description: config.description,
    lang: SITE_LOCALE,
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
