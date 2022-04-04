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
      RELEASE_DATE: new Date().toISOString(),
      // check if we're running locally via `next dev`:
      IS_DEV_SERVER: phase === PHASE_DEVELOPMENT_SERVER,
    },
    images: {
      deviceSizes: [640, 750, 828, 1080, 1200, 1920],
      formats: ["image/avif", "image/webp"],
      minimumCacheTTL: 43200,
    },
    experimental: {
      reactRoot: true, // 18
      images: {
        // allow forgoing the mess of `<span>`s around statically imported images
        layoutRaw: true,
      },
    },
    webpack: (config) => {
      // this lets us statically import webfonts like we would images, allowing cool things like preloading them
      config.module.rules.push({
        test: /\.(woff|woff2|eot|ttf|otf)$/i,
        issuer: { and: [/\.(js|ts|md)x?$/] },
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
        issuer: { and: [/\.(js|ts|md)x?$/] },
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
          path.resolve(__dirname, "components/Icons"),
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
          {
            key: "Onion-Location",
            value: `${config.onionDomain}/:path*`,
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
      { source: "/:slug/amp.html", destination: "/:slug/", statusCode: 301 },

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

      // misc. crap:
      { source: "/resume/", destination: "/static/resume.pdf", permanent: false },
      { source: "/resume.pdf", destination: "/static/resume.pdf", permanent: false },
      {
        source: "/stats/",
        destination: `https://app.usefathom.com/share/${config.fathomSiteId}/${config.siteDomain}`,
        permanent: false,
      },
      { source: "/jarvis.asc", destination: "/pubkey.asc", permanent: true },
      { source: "/scrabble/:path*", destination: "https://jakejarvis.github.io/scrabble/:path*", permanent: false },
    ],
  };

  return withPlugins(nextPlugins, nextConfig)(phase, { defaultConfig });
};
