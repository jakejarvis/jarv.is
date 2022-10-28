// @ts-check
/* eslint-disable @typescript-eslint/no-var-requires */
const path = require("path");
const { PHASE_DEVELOPMENT_SERVER } = require("next/constants");
const config = require("./lib/config");

module.exports = (phase) => {
  /**
   * @type {import("next").NextConfig}
   */
  const nextConfig = {
    swcMinify: true,
    reactStrictMode: true,
    trailingSlash: true,
    productionBrowserSourceMaps: true,
    env: {
      BASE_URL:
        process.env.NEXT_PUBLIC_VERCEL_ENV !== "production" && process.env.NEXT_PUBLIC_VERCEL_URL !== undefined
          ? `https://${process.env.NEXT_PUBLIC_VERCEL_URL}` // https://vercel.com/docs/concepts/projects/environment-variables#system-environment-variables
          : phase === PHASE_DEVELOPMENT_SERVER
          ? `http://localhost:${process.env.PORT || 3000}` // https://nextjs.org/docs/api-reference/cli#development
          : `https://${config.siteDomain}`, // fallback to production url
      // freeze build timestamp for when server-side pages need a "last updated" date:
      RELEASE_DATE: new Date().toISOString(),
      // check if we're running locally via `next dev`:
      IS_DEV_SERVER: phase === PHASE_DEVELOPMENT_SERVER ? "true" : "",
    },
    images: {
      deviceSizes: [640, 750, 828, 1080, 1200, 1920],
      formats: ["image/avif", "image/webp"],
    },
    experimental: {
      legacyBrowsers: false,
      newNextLinkBehavior: true, // https://github.com/vercel/next.js/pull/36436
      optimisticClientCache: false, // https://github.com/vercel/next.js/discussions/40268#discussioncomment-3572642
      fontLoaders: [
        {
          // https://beta.nextjs.org/docs/optimizing/fonts#specifying-a-subset
          loader: "@next/font/google",
          options: { subsets: ["latin"] },
        },
      ],
    },
    webpack: (config) => {
      // allow processing SVGs from the below packages directly instead of through their different exports, and leave
      // other static imports of SVGs alone.
      // see: ./components/Icons/index.ts
      config.module.rules.push({
        test: /\.svg$/i,
        issuer: { and: [/\.(js|ts)x?$/] },
        use: [
          {
            loader: "@svgr/webpack",
            options: {
              icon: true,
              typescript: true,
              svgProps: {
                "aria-hidden": true,
              },
            },
          },
        ],
        include: [
          path.resolve(__dirname, "node_modules/@primer/octicons/build/svg"),
          path.resolve(__dirname, "node_modules/feather-icons/dist/icons"),
          path.resolve(__dirname, "node_modules/simple-icons/icons"),
        ],
      });

      return config;
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

  return nextConfig;
};
