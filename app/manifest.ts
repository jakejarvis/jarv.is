import * as config from "../lib/config";
import { chrome512Png, chrome192Png, maskable512Png, maskable192Png } from "../lib/config/favicons";
import type { MetadataRoute } from "next";

const manifest = (): MetadataRoute.Manifest => {
  return {
    name: config.siteName,
    short_name: config.siteDomain,
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
