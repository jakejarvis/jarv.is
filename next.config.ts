import type { NextConfig } from "next";
import createMDX from "@next/mdx";
import createBundleAnalyzer from "@next/bundle-analyzer";
import * as mdxPlugins from "./lib/helpers/remark-rehype-plugins";

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
      { protocol: "https", hostname: "pbs.twimg.com" },
      { protocol: "https", hostname: "abs.twimg.com" },
    ],
  },
  outputFileTracingIncludes: {
    "/notes/[slug]/opengraph-image": [
      "./notes/**/index.mdx",
      "./notes/**/opengraph-image.*",
      "./public/static/me.jpg",
      "./node_modules/geist/dist/fonts/geist-sans/Geist-SemiBold.ttf",
    ],
  },
  experimental: {
    serverActions: {
      allowedOrigins: ["jarv.is", "jarvis2i2vp4j4tbxjogsnqdemnte5xhzyi7hziiyzxwge3hzmh57zad.onion"],
    },
    ppr: "incremental", // https://nextjs.org/docs/app/building-your-application/rendering/partial-prerendering#using-partial-prerendering
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

const withBundleAnalyzer = createBundleAnalyzer({
  enabled: process.env.ANALYZE === "true",
});

const withMDX = createMDX({
  options: {
    remarkPlugins: [
      [mdxPlugins.remarkGfm, { singleTilde: false }],
      [
        mdxPlugins.remarkSmartypants,
        {
          quotes: true,
          dashes: "oldschool",
          backticks: false,
          ellipses: false,
        },
      ],
    ],
    rehypePlugins: [
      mdxPlugins.rehypeUnwrapImages,
      mdxPlugins.rehypeSlug,
      [mdxPlugins.rehypePrism, { ignoreMissing: true }],
      mdxPlugins.rehypeMdxImportMedia,
    ],
  },
});

export default withBundleAnalyzer(withMDX(nextConfig));
