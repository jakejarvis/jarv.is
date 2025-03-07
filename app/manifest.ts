import config from "../lib/config/constants";
import type { MetadataRoute } from "next";

const manifest = (): MetadataRoute.Manifest => {
  return {
    name: config.siteName,
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
    start_url: "/",
  };
};

export default manifest;
