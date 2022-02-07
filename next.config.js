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
      IS_DEV_SERVER: phase === PHASE_DEVELOPMENT_SERVER,
    },
    images: {
      deviceSizes: [640, 750, 828, 1080, 1200, 1920],
    },
    webpack: (config) => {
      config.module.rules.push({
        test: /\.svg$/,
        issuer: { and: [/\.(js|ts)x?$/] },
        include: [
          path.resolve(__dirname, "components/icons"),
          // slight workaround to grab svg files from these packages directly instead of through their exports:
          path.resolve(__dirname, "node_modules/@primer/octicons/build/svg"),
          path.resolve(__dirname, "node_modules/feather-icons/dist/icons"),
          path.resolve(__dirname, "node_modules/simple-icons/icons"),
          path.resolve(__dirname, "node_modules/twemoji/assets/svg"),
        ],
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
      { source: "/apple-touch-icon.png", destination: "/static/favicons/apple-touch-icon.png" },
      { source: "/apple-touch-icon-precomposed.png", destination: "/static/favicons/apple-touch-icon.png" },
    ],
    redirects: async () => [
      { source: "/notes/:slug/amp.html", destination: "/notes/:slug/", statusCode: 301 },
      { source: "/resume/", destination: "/static/resume.pdf", permanent: false },
      { source: "/resume.pdf", destination: "/static/resume.pdf", permanent: true },
      { source: "/stats/", destination: "https://app.usefathom.com/share/wbgnqukw/jarv.is", permanent: false },
      { source: "/scrabble/:path*", destination: "https://jakejarvis.github.io/scrabble/:path*", permanent: false },
      { source: "/jarvis.asc", destination: "/pubkey.asc", permanent: true },
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
    ],
  };

  return withPlugins(nextPlugins, nextConfig)(phase, { defaultConfig });
};
