/* eslint-disable @typescript-eslint/no-require-imports, import/no-anonymous-default-export */

import path from "path";
import { visit } from "unist-util-visit";
import * as mdxPlugins from "./lib/helpers/remark-rehype-plugins";
import type { NextConfig } from "next";

// check environment variables at build time
// https://env.t3.gg/docs/nextjs#validate-schema-on-build-(recommended)
import "./lib/env";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  productionBrowserSourceMaps: true,
  env: {
    // same logic as metadataBase: https://nextjs.org/docs/app/api-reference/functions/generate-metadata#default-value
    NEXT_PUBLIC_BASE_URL:
      process.env.VERCEL_ENV === "production" && process.env.VERCEL_PROJECT_PRODUCTION_URL
        ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
        : process.env.VERCEL_ENV === "preview" && process.env.VERCEL_BRANCH_URL
          ? `https://${process.env.VERCEL_BRANCH_URL}`
          : process.env.VERCEL_URL
            ? `https://${process.env.VERCEL_URL}`
            : `http://localhost:${process.env.PORT || 3000}`,

    // freeze timestamp at build time for when server-side pages need a "last updated" date. calling Date.now() from
    // pages using getServerSideProps will return the current(ish) time instead, which is usually not what we want.
    NEXT_PUBLIC_RELEASE_TIMESTAMP: new Date().toISOString(),
  },
  pageExtensions: ["js", "jsx", "ts", "tsx", "md", "mdx"],
  outputFileTracingIncludes: {
    "/notes/[slug]/opengraph-image": [
      "./notes/**/*",
      "./app/opengraph-image.jpg",
      "./node_modules/geist/dist/fonts/geist-sans/Geist-Regular.ttf",
      "./node_modules/geist/dist/fonts/geist-sans/Geist-SemiBold.ttf",
    ],
  },
  outputFileTracingExcludes: {
    "*": ["./public/**/*", "**/*.mp4", "**/*.webm", "**/*.vtt"],
  },
  transpilePackages: [
    // https://env.t3.gg/docs/nextjs#create-your-schema
    "@t3-oss/env-core",
    "@t3-oss/env-nextjs",
  ],
  webpack: (config) => {
    config.module.rules.push({
      test: /\.(mp4|webm|vtt)$/i,
      type: "asset/resource",
      generator: {
        // https://github.com/vercel/next.js/blob/4447ea402a50113490103abe14255e95dcc8cf69/packages/next/src/build/webpack-config.ts#L1231
        // https://github.com/vercel/next.js/discussions/18852#discussioncomment-10752440
        outputPath: path.relative(config.output.path, path.resolve(process.cwd(), ".next/")),
      },
    });

    return config;
  },
  experimental: {
    reactCompiler: true, // https://react.dev/learn/react-compiler
    ppr: "incremental", // https://nextjs.org/docs/app/building-your-application/rendering/partial-prerendering#using-partial-prerendering
    serverActions: {
      allowedOrigins: ["jarv.is", "jarvis2i2vp4j4tbxjogsnqdemnte5xhzyi7hziiyzxwge3hzmh57zad.onion"],
    },
  },
  eslint: {
    dirs: ["app", "components", "contexts", "hooks", "lib", "notes"],
  },
  headers: async () => [
    {
      // matches any path
      source: "/(.*)",
      headers: [
        {
          key: "strict-transport-security",
          value: "max-age=63072000",
        },
        {
          // 🥛 debugging
          key: "x-got-milk",
          value: "2%",
        },
      ],
    },
    {
      source: "/_stream/(.*)",
      headers: [
        {
          // https://vercel.com/docs/rewrites#caching-rewrites
          key: "x-vercel-enable-rewrite-caching",
          value: "1",
        },
      ],
    },
    ...(process.env.NEXT_PUBLIC_UMAMI_WEBSITE_ID
      ? [
          {
            source: "/_stream/u/api/send",
            headers: [
              {
                key: "cache-control",
                value: "no-cache, no-store",
              },
              {
                key: "x-vercel-enable-rewrite-caching",
                value: "0",
              },
            ],
          },
        ]
      : []),
    ...(process.env.NEXT_PUBLIC_ONION_DOMAIN
      ? [
          {
            // https://community.torproject.org/onion-services/advanced/onion-location/
            // only needed on actual pages, not static assets, so make a best effort by matching any path **without** a file
            // extension (aka a period) and/or an underscore (e.g. /_next/image).
            source: "/:path([^._]*)",
            headers: [
              {
                key: "onion-location",
                value: `http://${process.env.NEXT_PUBLIC_ONION_DOMAIN}/:path`,
              },
            ],
          },
        ]
      : []),
  ],
  rewrites: async () => [
    ...(process.env.NEXT_PUBLIC_UMAMI_WEBSITE_ID
      ? [
          {
            // https://umami.is/docs/guides/running-on-vercel#proxy-umami-analytics-via-vercel
            source: "/_stream/u/:path(script.js|api/send)",
            destination: `${process.env.NEXT_PUBLIC_UMAMI_URL || "https://cloud.umami.is"}/:path`,
          },
        ]
      : []),
    {
      // https://github.com/jakejarvis/tweets
      source: "/tweets/:path*",
      destination: "https://tweets-khaki.vercel.app/:path*",
    },
  ],
  redirects: async () => [
    { source: "/y2k", destination: "https://y2k.pages.dev", permanent: false },
    {
      source: "/stats",
      destination: "https://umami-wine-eight.vercel.app/share/wwTaTpLgC6gP9VyX/jarv.is",
      permanent: false,
    },
    {
      source: "/pubkey.asc",
      destination:
        "https://keys.openpgp.org/pks/lookup?op=get&options=mr&search=0x3bc6e5776bf379d36f6714802b0c9cf251e69a39",
      permanent: false,
    },

    // NOTE: don't remove this, it ensures de-AMPing the site hasn't offended our google overlords too badly!
    // https://developers.google.com/search/docs/advanced/experience/remove-amp#remove-only-amp
    { source: "/notes/:slug/amp.html", destination: "/notes/:slug", permanent: true },

    // mastodon via subdomain:
    // https://docs.joinmastodon.org/admin/config/#web_domain
    {
      source: "/.well-known/:path(host-meta|webfinger|nodeinfo)",
      destination: "https://fediverse.jarv.is/.well-known/:path",
      permanent: true,
    },
    {
      source: "/@jake:path(/?|/.*)",
      destination: "https://fediverse.jarv.is/@jake:path",
      permanent: true,
    },

    // remnants of previous sites/CMSes:
    { source: "/index.xml", destination: "/feed.xml", permanent: true },
    { source: "/feed", destination: "/feed.xml", permanent: true },
    { source: "/rss", destination: "/feed.xml", permanent: true },
    { source: "/blog/(.*)", destination: "/notes", permanent: true },
    { source: "/archives/(.*)", destination: "/notes", permanent: true },
    { source: "/resume", destination: "/static/resume.pdf", permanent: false },
    { source: "/resume.pdf", destination: "/static/resume.pdf", permanent: false },

    // WordPress permalinks:
    {
      source: "/2016/02/28/millenial-with-hillary-clinton",
      destination: "/notes/millenial-with-hillary-clinton",
      permanent: true,
    },
    {
      source: "/2018/12/04/how-to-shrink-linux-virtual-disk-vmware",
      destination: "/notes/how-to-shrink-linux-virtual-disk-vmware",
      permanent: true,
    },
    {
      source: "/2018/12/10/cool-bash-tricks-for-your-terminal-dotfiles",
      destination: "/notes/cool-bash-tricks-for-your-terminal-dotfiles",
      permanent: true,
    },
  ],
};

// my own macgyvered version of next-compose-plugins (RIP)
const nextPlugins: Array<
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  (config: NextConfig) => NextConfig | [(config: NextConfig) => NextConfig, any]
> = [
  require("@next/bundle-analyzer")({
    enabled: !!process.env.ANALYZE,
  }),
  require("@next/mdx")({
    options: {
      remarkPlugins: [
        mdxPlugins.remarkFrontmatter,
        mdxPlugins.remarkMdxFrontmatter,
        mdxPlugins.remarkGfm,
        mdxPlugins.remarkSmartypants,
        // workaround for rehype-mdx-import-media not applying to `<video>` tags:
        // https://github.com/Chailotl/remark-videos/blob/851c332993210e6f091453f7ed887be24492bcee/index.js
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        () => (tree: any) => {
          visit(tree, "image", (node) => {
            if (node.url.match(/\.(mp4|webm)$/i)) {
              node.type = "element";
              node.data = {
                hName: "video",
                hProperties: {
                  src: node.url,
                  // TODO: make this even hackier and pass an autoplay option in the alt text or something
                },
              };
            }
          });
        },
      ],
      rehypePlugins: [
        mdxPlugins.rehypeUnwrapImages,
        mdxPlugins.rehypeSlug,
        [
          mdxPlugins.rehypePrettyCode,
          {
            theme: {
              light: "material-theme-lighter",
              dark: "material-theme-darker",
            },
            bypassInlineCode: true,
            defaultLang: "plaintext",
            grid: false,
            keepBackground: false,
          },
        ],
        mdxPlugins.rehypeMdxImportMedia,
      ],
    },
  }),
];

export default (): NextConfig =>
  nextPlugins.reduce((acc, plugin) => (Array.isArray(plugin) ? plugin[0](acc, plugin[1]) : plugin(acc)), nextConfig);
