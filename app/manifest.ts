import config from "../lib/config";
import type { MetadataRoute } from "next";

import chrome512Png from "../public/static/favicons/android-chrome-512x512.png";
import chrome192Png from "../public/static/favicons/android-chrome-192x192.png";
import maskable512Png from "../public/static/favicons/maskable-512x512.png";
import maskable192Png from "../public/static/favicons/maskable-192x192.png";

const manifest = (): MetadataRoute.Manifest => {
  return {
    name: config.siteName,
    short_name: config.siteName,
    description: config.longDescription,
    lang: config.siteLocale,
    icons: [
      {
        src: chrome512Png.src,
        sizes: `${chrome512Png.width}x${chrome512Png.height}`,
        type: "image/png",
        purpose: "any",
      },
      {
        src: chrome192Png.src,
        sizes: `${chrome192Png.width}x${chrome192Png.height}`,
        type: "image/png",
        purpose: "any",
      },
      {
        src: maskable512Png.src,
        sizes: `${maskable512Png.width}x${maskable512Png.height}`,
        type: "image/png",
        purpose: "maskable",
      },
      {
        src: maskable192Png.src,
        sizes: `${maskable192Png.width}x${maskable192Png.height}`,
        type: "image/png",
        purpose: "maskable",
      },
    ],
    display: "browser",
    start_url: "/",
  };
};

export default manifest;
