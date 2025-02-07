import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  trailingSlash: true,
  skipMiddlewareUrlNormalize: true,
  productionBrowserSourceMaps: true,
  env: {
    // freeze timestamp at build time for when server-side pages need a "last updated" date. calling Date.now() from
    // pages using getServerSideProps will return the current(ish) time instead, which is usually not what we want.
    RELEASE_DATE: new Date().toISOString(),
  },
  images: {
    deviceSizes: [640, 750, 828, 1080, 1200, 1920],
    formats: ["image/avif", "image/webp"],
    remotePatterns: [
      { protocol: "https", hostname: "pbs.twimg.com" },
      { protocol: "https", hostname: "abs.twimg.com" },
    ],
  },
  experimental: {
    typedRoutes: true,
    largePageDataBytes: 512 * 1000, // raise getStaticProps limit to 512 kB since compiled MDX will exceed the default.
    optimisticClientCache: false, // https://github.com/vercel/next.js/discussions/40268#discussioncomment-3572642
  },
  eslint: {
    // https://nextjs.org/docs/basic-features/eslint#linting-custom-directories-and-files
    dirs: ["app", "components", "contexts", "hooks", "lib", "types"],
  },
  headers: async () => [
    {
      source: "/:path(.*)",
      headers: [
        {
          // 🥛
          key: "x-got-milk",
          value: "2%",
        },
      ],
    },
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
  rewrites: async () => ({
    beforeFiles: [
      // https://github.com/jakejarvis/tweets/deployments/github-pages
      {
        source: "/tweets/:path*/",
        destination: "https://jakejarvis.github.io/tweets/:path*/",
      },
      {
        // workaround for broken trailing slash redirects:
        // https://github.com/vercel/next.js/discussions/36219#discussioncomment-4167863
        source: "/tweets/:path*",
        destination: "https://jakejarvis.github.io/tweets/:path*",
      },
    ],
    afterFiles: [
      {
        // access security.txt, etc at both /security.txt and /.well-known/security.txt
        source: "/.well-known/:slug.txt",
        destination: "/:slug.txt",
      },
    ],
    fallback: [],
  }),
  redirects: async () => [
    { source: "/y2k", destination: "https://y2k.pages.dev", permanent: false },

    // NOTE: don't remove this, it ensures de-AMPing the site hasn't offended our google overlords too badly!
    // https://developers.google.com/search/docs/advanced/experience/remove-amp#remove-only-amp
    { source: "/notes/:slug/amp.html", destination: "/notes/:slug/", permanent: true },

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

    // google search console has tons of 404s for images prefixed with /public... why? no clue.
    { source: "/public/static/:path*", destination: "/static/:path*", permanent: true },

    // remnants of previous sites/CMSes:
    { source: "/index.xml", destination: "/feed.xml", permanent: true },
    { source: "/feed", destination: "/feed.xml", permanent: true },
    { source: "/rss", destination: "/feed.xml", permanent: true },
    { source: "/blog/:path*", destination: "/notes/", permanent: true },
    { source: "/archives/:path*", destination: "/notes/", permanent: true },
    { source: "/resume", destination: "/static/resume.pdf", permanent: false },
    { source: "/resume.pdf", destination: "/static/resume.pdf", permanent: false },

    // WordPress permalinks:
    {
      source: "/2016/02/28/millenial-with-hillary-clinton",
      destination: "/notes/millenial-with-hillary-clinton/",
      permanent: true,
    },
    {
      source: "/2018/12/04/how-to-shrink-linux-virtual-disk-vmware",
      destination: "/notes/how-to-shrink-linux-virtual-disk-vmware/",
      permanent: true,
    },
    {
      source: "/2018/12/10/cool-bash-tricks-for-your-terminal-dotfiles",
      destination: "/notes/cool-bash-tricks-for-your-terminal-dotfiles/",
      permanent: true,
    },
  ],
};

// eslint-disable-next-line @typescript-eslint/no-require-imports
const withBundleAnalyzer = require("@next/bundle-analyzer")({
  enabled: process.env.ANALYZE === "true",
});

export default withBundleAnalyzer(nextConfig);
