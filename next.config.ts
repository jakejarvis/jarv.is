import * as remarkPlugins from "@/lib/remark";
import * as rehypePlugins from "@/lib/rehype";
import type { NextConfig } from "next";

// check environment variables at build time
// https://env.t3.gg/docs/nextjs#validate-schema-on-build-(recommended)
import "@/lib/env";

const nextConfig = {
  reactStrictMode: true,
  pageExtensions: ["js", "jsx", "ts", "tsx", "md", "mdx"],
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    qualities: [50, 75, 100],
    remotePatterns: [
      {
        protocol: "https",
        hostname: "ijyxfbpcm3itvdly.public.blob.vercel-storage.com",
      },
      {
        protocol: "https",
        hostname: "avatars.githubusercontent.com",
      },
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
  productionBrowserSourceMaps: true,
  experimental: {
    reactCompiler: true,
    ppr: "incremental",
    dynamicOnHover: true,
    inlineCss: true,
    serverActions: {
      // fix CSRF errors from tor reverse proxy
      allowedOrigins: [
        "jarv.is",
        ...(process.env.NEXT_PUBLIC_ONION_DOMAIN ? [process.env.NEXT_PUBLIC_ONION_DOMAIN] : []),
      ],
    },
    staleTimes: {
      dynamic: 0, // disable client-side router cache for dynamic pages
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
    {
      source: "/api/auth/(.*)",
      headers: [
        {
          key: "cache-control",
          value: "private, max-age=0",
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
} satisfies NextConfig;

// my own macgyvered version of next-compose-plugins (RIP)
const nextPlugins: Array<
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  (config: NextConfig) => NextConfig | [(config: NextConfig) => NextConfig, any]
> = [
  // eslint-disable-next-line @typescript-eslint/no-require-imports
  require("@next/bundle-analyzer")({
    enabled: !!process.env.ANALYZE,
  }),
  // eslint-disable-next-line @typescript-eslint/no-require-imports
  require("@next/mdx")({
    options: {
      remarkPlugins: [
        remarkPlugins.remarkFrontmatter,
        remarkPlugins.remarkMdxFrontmatter,
        remarkPlugins.remarkGfm,
        remarkPlugins.remarkSmartypants,
      ],
      rehypePlugins: [
        rehypePlugins.rehypeUnwrapImages,
        rehypePlugins.rehypeSlug,
        [
          rehypePlugins.rehypeWrapper,
          {
            className: "text-[0.925rem] leading-relaxed first:mt-0 last:mb-0 md:text-base [&_p]:my-5",
          },
        ],
        rehypePlugins.rehypeMdxCodeProps,
        rehypePlugins.rehypeMdxImportMedia,
      ],
    },
  }),
  // eslint-disable-next-line @typescript-eslint/no-require-imports
  require("botid/next/config").withBotId,
];

// eslint-disable-next-line import/no-anonymous-default-export
export default (): NextConfig =>
  nextPlugins.reduce((acc, plugin) => (Array.isArray(plugin) ? plugin[0](acc, plugin[1]) : plugin(acc)), nextConfig);
