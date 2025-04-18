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
  pageExtensions: ["js", "jsx", "ts", "tsx", "md", "mdx"],
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
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
  productionBrowserSourceMaps: true,
  webpack: (config) => {
    config.module.rules.push({
      test: /\.(mp4|webm|vtt)$/i,
      type: "asset/resource",
      generator: {
        // https://github.com/vercel/next.js/blob/4447ea402a50113490103abe14255e95dcc8cf69/packages/next/src/build/webpack-config.ts#L1231
        // https://github.com/vercel/next.js/discussions/18852#discussioncomment-10752440
        outputPath: path.relative(config.output.path, path.join(process.cwd(), ".next/")),
      },
    });

    return config;
  },
  experimental: {
    reactCompiler: true, // https://react.dev/learn/react-compiler
    ppr: "incremental", // https://nextjs.org/docs/app/building-your-application/rendering/partial-prerendering#using-partial-prerendering
    dynamicOnHover: true,
    serverActions: {
      // fix CSRF errors from tor reverse proxy
      // https://nextjs.org/docs/app/building-your-application/deploying/multi-zones#server-actions
      allowedOrigins: [
        "jarv.is",
        ...(process.env.NEXT_PUBLIC_ONION_DOMAIN ? [process.env.NEXT_PUBLIC_ONION_DOMAIN] : []),
      ],
    },
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

    // https://community.torproject.org/onion-services/advanced/onion-location/
    ...(process.env.NEXT_PUBLIC_ONION_DOMAIN
      ? [
          {
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
    {
      // https://github.com/jakejarvis/tweets
      source: "/tweets/:path*",
      destination: "https://tweets-khaki.vercel.app/:path*",
    },
  ],
  redirects: async () => [
    { source: "/y2k", destination: "https://y2k.pages.dev", permanent: false },
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
