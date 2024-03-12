import config from "../lib/config";
import { chrome512Png, chrome192Png, maskable512Png, maskable192Png } from "../lib/config/favicons";
import type { GetServerSideProps } from "next";

export const getServerSideProps: GetServerSideProps<Record<string, never>> = async (context) => {
  const { res } = context;

  // https://developer.mozilla.org/en-US/docs/Web/Manifest#deploying_a_manifest
  res.setHeader("content-type", "application/manifest+json; charset=utf-8");
  // cache on edge for one week
  res.setHeader("cache-control", "public, max-age=0, s-maxage=604800, stale-while-revalidate");

  const manifest = {
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

  res.write(JSON.stringify(manifest));
  res.end();

  return {
    props: {},
  };
};

// eslint-disable-next-line import/no-anonymous-default-export
export default () => null;
