/* eslint-disable @typescript-eslint/no-require-imports */

import path from "path";
import { visit } from "unist-util-visit";
import * as mdxPlugins from "./lib/helpers/remark-rehype-plugins";
import type { NextConfig } from "next";

type NextPlugin = (
  config: NextConfig,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  options?: any
) => NextConfig;

const nextConfig: NextConfig = {
  reactStrictMode: true,
  productionBrowserSourceMaps: true,
  env: {
    // freeze timestamp at build time for when server-side pages need a "last updated" date. calling Date.now() from
    // pages using getServerSideProps will return the current(ish) time instead, which is usually not what we want.
    RELEASE_DATE: new Date().toISOString(),
  },
  pageExtensions: ["js", "jsx", "ts", "tsx", "md", "mdx"],
  images: {
    formats: ["image/avif", "image/webp"],
    remotePatterns: [
      { protocol: "https", hostname: "abs.twimg.com" },
      { protocol: "https", hostname: "pbs.twimg.com" },
    ],
  },
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
    serverSourceMaps: true,
  },
  eslint: {
    // https://nextjs.org/docs/basic-features/eslint#linting-custom-directories-and-files
    dirs: ["app", "components", "contexts", "hooks", "lib", "notes"],
  },
  headers: async () => [
    {
      source: "/pubkey.asc",
      headers: [
        {
          key: "Content-Type",
          value: "text/plain; charset=utf-8",
        },
      ],
    },
  ],
  rewrites: async () => [
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

    // NOTE: don't remove this, it ensures de-AMPing the site hasn't offended our google overlords too badly!
    // https://developers.google.com/search/docs/advanced/experience/remove-amp#remove-only-amp
    { source: "/notes/:slug/amp.html", destination: "/notes/:slug", permanent: true },

    // mastodon via subdomain:
    // https://docs.joinmastodon.org/admin/config/#web_domain
    {
      source: "/.well-known/host-meta:path*",
      destination: "https://fediverse.jarv.is/.well-known/host-meta:path*",
      permanent: true,
    },
    {
      source: "/.well-known/webfinger:path*",
      destination: "https://fediverse.jarv.is/.well-known/webfinger:path*",
      permanent: true,
    },
    {
      source: "/.well-known/nodeinfo:path*",
      destination: "https://fediverse.jarv.is/.well-known/nodeinfo:path*",
      permanent: true,
    },
    {
      source: "/@jake",
      destination: "https://fediverse.jarv.is/@jake",
      permanent: true,
    },
    {
      source: "/@jake/:path*",
      destination: "https://fediverse.jarv.is/@jake/:path*",
      permanent: true,
    },

    // remnants of previous sites/CMSes:
    { source: "/index.xml", destination: "/feed.xml", permanent: true },
    { source: "/feed", destination: "/feed.xml", permanent: true },
    { source: "/rss", destination: "/feed.xml", permanent: true },
    { source: "/blog/:path*", destination: "/notes", permanent: true },
    { source: "/archives/:path*", destination: "/notes", permanent: true },
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
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const nextPlugins: Array<NextPlugin | [NextPlugin, any]> = [
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
  [
    require("@sentry/nextjs").withSentryConfig,
    {
      // https://docs.sentry.io/platforms/javascript/guides/nextjs/configuration/build/
      org: process.env.SENTRY_ORG,
      project: process.env.SENTRY_PROJECT,
      authToken: process.env.SENTRY_AUTH_TOKEN,
      silent: !process.env.CI,
      tunnelRoute: "/_otel", // ensure this path is included in middleware's negative config.matcher expression
      widenClientFileUpload: true,
      disableLogger: true,
      telemetry: false,
      autoInstrumentAppDirectory: true,
      autoInstrumentServerFunctions: true,
      autoInstrumentMiddleware: false,
      bundleSizeOptimizations: {
        excludeDebugStatements: true,
      },
    },
  ],
];

// eslint-disable-next-line import/no-anonymous-default-export
export default (): NextConfig =>
  nextPlugins.reduce((acc, next) => {
    if (Array.isArray(next)) {
      return (next[0] as NextPlugin)(acc, next[1]);
    }

    return (next as NextPlugin)(acc);
  }, nextConfig);
