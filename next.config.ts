import * as remarkPlugins from "@/lib/remark";
import * as rehypePlugins from "@/lib/rehype";
import { fromHtml } from "hast-util-from-html";
import { toString as nodeToString } from "hast-util-to-string";
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
    remotePatterns: [
      {
        protocol: "https",
        hostname: "ijyxfbpcm3itvdly.public.blob.vercel-storage.com",
        port: "",
        pathname: "/**",
        search: "",
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
          rehypePlugins.rehypeAutolinkHeadings,
          {
            behavior: "append",
            properties: {
              ariaHidden: true,
              className:
                "text-muted-foreground hover:text-primary hover:no-underline ml-2 inline-block px-2 align-baseline max-md:hidden",
              tabIndex: -1,
            },
            // @ts-ignore
            content: (heading) =>
              fromHtml(
                `<svg width="16" height="16" viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg" className="inline-block align-baseline"><path fill-rule="evenodd" fill="currentcolor" d="M4 9h1v1H4c-1.5 0-3-1.69-3-3.5S2.55 3 4 3h4c1.45 0 3 1.69 3 3.5 0 1.41-.91 2.72-2 3.25V8.59c.58-.45 1-1.27 1-2.09C10 5.22 8.98 4 8 4H4c-.98 0-2 1.22-2 2.5S3 9 4 9zm9-3h-1v1h1c1 0 2 1.22 2 2.5S13.98 12 13 12H9c-.98 0-2-1.22-2-2.5 0-.83.42-1.64 1-2.09V6.25c-1.09.53-2 1.84-2 3.25C6 11.31 7.55 13 9 13h4c1.45 0 3-1.69 3-3.5S14.5 6 13 6z"/></svg><span class="sr-only">Jump to "${nodeToString(heading)}"</span>`,
                { fragment: true }
              ).children,
          } satisfies Parameters<typeof rehypePlugins.rehypeAutolinkHeadings>[0],
        ],
        [
          rehypePlugins.rehypeWrapper,
          {
            className:
              "text-[0.925rem] leading-relaxed first:mt-0 last:mb-0 md:text-base [&_p]:my-5 [&_strong]:font-bold",
          } satisfies Parameters<typeof rehypePlugins.rehypeWrapper>[0],
        ],
        rehypePlugins.rehypeMdxCodeProps,
        rehypePlugins.rehypeMdxImportMedia,
      ],
    },
  }),
];

// eslint-disable-next-line import/no-anonymous-default-export
export default (): NextConfig =>
  nextPlugins.reduce((acc, plugin) => (Array.isArray(plugin) ? plugin[0](acc, plugin[1]) : plugin(acc)), nextConfig);
