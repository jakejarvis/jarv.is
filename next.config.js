/* eslint-disable @typescript-eslint/no-var-requires */
const path = require("path");
const { PHASE_DEVELOPMENT_SERVER } = require("next/constants");
const withPlugins = require("next-compose-plugins");
const config = require("./lib/config");

module.exports = (phase, { defaultConfig }) => {
  const nextPlugins = [
    require("next-transpile-modules")([
      // fixes some mystery issues in the noVNC library
      "@novnc/novnc",
    ]),
    require("@next/bundle-analyzer")({
      enabled: process.env.ANALYZE === "true",
    }),
  ];

  /**
   * @type {import("next").NextConfig}
   */
  const nextConfig = {
    swcMinify: true,
    reactStrictMode: true,
    trailingSlash: true,
    productionBrowserSourceMaps: true,
    env: {
      // freeze build timestamp for when serverless pages need a "last updated" date:
      NEXT_PUBLIC_RELEASE_DATE: new Date().toISOString(),
      // check if we're running locally via `next dev`:
      IS_DEV_SERVER: phase === PHASE_DEVELOPMENT_SERVER,
      // https://nextjs.org/docs/api-reference/cli#development
      NEXT_DEV_PORT: process.env.PORT || 3000,
    },
    images: {
      deviceSizes: [640, 750, 828, 1080, 1200, 1920],
      formats: ["image/avif", "image/webp"],
    },
    experimental: {
      images: {
        allowFutureImage: true, // https://github.com/vercel/next.js/pull/37927
      },
      newNextLinkBehavior: true, // https://github.com/vercel/next.js/pull/36436
    },
    webpack: (config) => {
      // this lets us statically import webfonts like we would images, allowing cool things like preloading them
      config.module.rules.push({
        test: /\.(woff|woff2|eot|ttf|otf)$/i,
        issuer: { and: [/\.(js|ts)x?$/] },
        type: "asset/resource",
        generator: {
          filename: "static/media/[name].[hash:8][ext]",
        },
      });

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
    headers: async () => [
      {
        source: "/:path(.*)",
        headers: [
          config.onionDomain && {
            // https://gitweb.torproject.org/tor-browser-spec.git/tree/proposals/100-onion-location-header.txt
            key: "Onion-Location",
            value: `${config.onionDomain}/:path*`,
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
            key: "Cache-Control",
            value: "private, no-cache, no-store, must-revalidate",
          },
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

  return withPlugins(nextPlugins, nextConfig)(phase, { defaultConfig });
};
