import * as config from "../lib/config";
import type { GetServerSideProps } from "next";

const SiteManifest = () => null;

export const getServerSideProps: GetServerSideProps = async (context) => {
  const manifest = {
    name: config.siteName,
    short_name: config.siteDomain,
    description: config.longDescription,
    lang: config.siteLocale,
    icons: [
      { src: "/static/favicons/android-chrome-512x512.png", sizes: "512x512", type: "image/png", purpose: "any" },
      { src: "/static/favicons/android-chrome-192x192.png", sizes: "192x192", type: "image/png", purpose: "any" },
      { src: "/static/favicons/maskable-512x512.png", sizes: "512x512", type: "image/png", purpose: "maskable" },
      { src: "/static/favicons/maskable-192x192.png", sizes: "192x192", type: "image/png", purpose: "maskable" },
    ],
    display: "browser",
    start_url: "/",
  };
  const { res } = context;

  // https://developer.mozilla.org/en-US/docs/Web/Manifest#deploying_a_manifest
  res.setHeader("content-type", "application/manifest+json");
  // cache for one day
  res.setHeader("cache-control", "s-maxage=86400, stale-while-revalidate");
  res.write(JSON.stringify(manifest));
  res.end();

  return {
    props: {},
  };
};

export default SiteManifest;
