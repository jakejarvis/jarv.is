// @ts-check
/* eslint-disable @typescript-eslint/no-var-requires */
const config = require("./lib/config");

/**
 * @type {import("next").NextConfig}
 */
const nextConfig = {
  swcMinify: true,
  reactStrictMode: true,
  trailingSlash: true,
  productionBrowserSourceMaps: true,
  transpilePackages: [
    "@novnc/novnc",
    "geist", // https://github.com/vercel/geist-font/issues/13#issuecomment-1798598309
    "react-tweet", // https://react-tweet.vercel.app/next#troubleshooting
  ],
  env: {
    BASE_URL:
      // start with production check on Vercel, then see if this is a deploy preview, then fallback to local dev server.
      process.env.NEXT_PUBLIC_VERCEL_ENV === "production"
        ? `https://${config.siteDomain}`
        : process.env.NEXT_PUBLIC_VERCEL_URL
          ? `https://${process.env.NEXT_PUBLIC_VERCEL_URL}` // https://vercel.com/docs/concepts/projects/environment-variables#system-environment-variables
          : `http://localhost:${process.env.PORT || 3000}`, // https://nextjs.org/docs/api-reference/cli#development
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
    largePageDataBytes: 512 * 1000, // raise getStaticProps limit to 512 kB since compiled MDX will exceed the default.
    optimisticClientCache: false, // https://github.com/vercel/next.js/discussions/40268#discussioncomment-3572642
  },
  eslint: {
    // https://nextjs.org/docs/basic-features/eslint#linting-custom-directories-and-files
    dirs: ["components", "contexts", "hooks", "lib", "pages", "types"],
  },
  headers: async () => [
    {
      source: "/:path(.*)",
      headers: [
        {
          // https://gitweb.torproject.org/tor-browser-spec.git/tree/proposals/100-onion-location-header.txt
          key: "Onion-Location",
          value: config.onionDomain ? `${config.onionDomain}/:path*` : "",
        },
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
  rewrites: async () => [
    { source: "/favicon.ico", destination: "/static/favicons/favicon.ico" },
    { source: "/favicon.png", destination: "/static/favicons/favicon.png" },
    { source: "/apple-touch-icon.png", destination: "/static/favicons/apple-touch-icon.png" },
    { source: "/apple-touch-icon-precomposed.png", destination: "/static/favicons/apple-touch-icon.png" },
    {
      source: "/tweets/:path*/",
      destination: "https://jakejarvis.github.io/tweets/:path*/",
    },
    {
      // rationale for double entries: https://github.com/vercel/next.js/discussions/36219#discussioncomment-4167863
      source: "/tweets/:path*",
      destination: "https://jakejarvis.github.io/tweets/:path*",
    },
  ],
  redirects: async () => [
    {
      source: "/stats/",
      destination: `https://app.usefathom.com/share/${config.fathomSiteId}/${config.siteDomain}`,
      permanent: false,
    },

    // NOTE: don't remove this, it ensures de-AMPing the site hasn't offended our google overlords too badly!
    // https://developers.google.com/search/docs/advanced/experience/remove-amp#remove-only-amp
    { source: "/notes/:slug/amp.html", destination: "/notes/:slug/", statusCode: 301 },

    // mastodon via subdomain
    // https://docs.joinmastodon.org/admin/config/#web_domain
    {
      source: "/.well-known/host-meta:path*",
      destination: "https://fediverse.jarv.is/.well-known/host-meta:path*",
      statusCode: 301,
    },
    {
      source: "/.well-known/webfinger:path*",
      destination: "https://fediverse.jarv.is/.well-known/webfinger:path*",
      statusCode: 301,
    },
    {
      source: "/.well-known/nodeinfo:path*",
      destination: "https://fediverse.jarv.is/.well-known/nodeinfo:path*",
      statusCode: 301,
    },
    {
      source: "/@jake/:path*",
      destination: "https://fediverse.jarv.is/@jake/:path*",
      statusCode: 301,
    },

    // remnants of previous sites/CMSes:
    { source: "/index.xml", destination: "/feed.xml", permanent: true },
    { source: "/feed/", destination: "/feed.xml", permanent: true },
    { source: "/rss/", destination: "/feed.xml", permanent: true },
    { source: "/blog/:path*", destination: "/notes/", permanent: true },
    { source: "/archives/:path*", destination: "/notes/", permanent: true },
    {
      source: "/2016/02/28/millenial-with-hillary-clinton/",
      destination: "/notes/millenial-with-hillary-clinton/",
      permanent: true,
    },
    {
      source: "/2018/12/04/how-to-shrink-linux-virtual-disk-vmware/",
      destination: "/notes/how-to-shrink-linux-virtual-disk-vmware/",
      permanent: true,
    },
    {
      source: "/2018/12/10/cool-bash-tricks-for-your-terminal-dotfiles/",
      destination: "/notes/cool-bash-tricks-for-your-terminal-dotfiles/",
      permanent: true,
    },
    { source: "/resume/", destination: "/static/resume.pdf", permanent: false },
    { source: "/resume.pdf", destination: "/static/resume.pdf", permanent: false },
  ],
};

module.exports = nextConfig;
