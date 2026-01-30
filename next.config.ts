import type { NextConfig } from "next";

// check environment variables at build time
// https://env.t3.gg/docs/nextjs#validate-schema-on-build-(recommended)
import "./lib/env";

const nextConfig = {
  cacheComponents: true,
  reactCompiler: true,
  pageExtensions: ["js", "jsx", "ts", "tsx", "md", "mdx"],
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
    viewTransition: true,
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
    {
      source: "/y2k/:path*",
      destination: "https://y2k.pages.dev/:path*",
    },
  ],
  redirects: async () => [
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
  require("@next/mdx")({
    options: {
      remarkPlugins: ["remark-frontmatter", "remark-mdx-frontmatter", "remark-gfm", "remark-smartypants"],
      rehypePlugins: [
        "rehype-unwrap-images",
        "rehype-slug",
        [
          "rehype-wrapper",
          {
            className: [
              "prose prose-neutral dark:prose-invert prose-sm max-w-none",
              "prose-headings:font-semibold prose-headings:text-primary prose-headings:tracking-tight",
              "prose-p:text-foreground/90 prose-strong:text-primary prose-li:text-foreground/80",
              "prose-a:text-primary prose-a:font-medium prose-a:underline prose-a:underline-offset-4",
              "prose-blockquote:[&_p]:text-foreground/75 prose-blockquote:*:before:content-none prose-blockquote:*:after:content-none",
              "prose-code:bg-muted prose-code:text-foreground prose-code:px-1 prose-code:py-0.5 prose-code:rounded-sm prose-code:text-[0.9em] prose-code:before:content-none prose-code:after:content-none",
              "[&_table]:!border-[color:var(--border)] [&_td]:!border-[color:var(--border)] [&_th]:!border-[color:var(--border)]",
            ].join(" "),
          },
        ],
        "rehype-mdx-code-props",
        "rehype-mdx-import-media",
      ],
    },
  }),
  // eslint-disable-next-line @typescript-eslint/no-require-imports
  require("botid/next/config").withBotId,
];

// eslint-disable-next-line import/no-anonymous-default-export
export default (): NextConfig =>
  nextPlugins.reduce((acc, plugin) => (Array.isArray(plugin) ? plugin[0](acc, plugin[1]) : plugin(acc)), nextConfig);
