/**
 * @type {import('next').NextConfig}
 */

/* eslint-disable @typescript-eslint/no-var-requires */

const path = require("path");
const { PHASE_DEVELOPMENT_SERVER } = require("next/constants");
const withPlugins = require("next-compose-plugins");
const config = require("./lib/config");

module.exports = (phase, { defaultConfig }) => {
  let BASE_URL = ""; // fallback to relative urls
  if (process.env.NEXT_PUBLIC_VERCEL_ENV === "production") {
    // vercel production (set manually)
    BASE_URL = `https://jarv.is`;
  } else if (process.env.NEXT_PUBLIC_VERCEL_URL) {
    // vercel deploy previews
    BASE_URL = `https://${process.env.NEXT_PUBLIC_VERCEL_URL}`;
  } else if (phase === PHASE_DEVELOPMENT_SERVER) {
    // local dev server
    BASE_URL = "http://localhost:3000";
  }

  return withPlugins(
    [
      require("@next/bundle-analyzer")({
        enabled: process.env.ANALYZE === "true",
      }),
    ],
    {
      swcMinify: true,
      reactStrictMode: true,
      trailingSlash: true,
      productionBrowserSourceMaps: true,
      env: {
        BASE_URL,
      },
      images: {
        formats: ["image/webp"],
        deviceSizes: [640, 750, 828, 1080, 1200, 1920],
      },
      experimental: {
        optimizeFonts: true,
        optimizeImages: true,
      },
      webpack: (config) => {
        config.module.rules.push({
          test: /\.svg$/,
          issuer: { and: [/\.(js|ts)x?$/] },
          include: [path.resolve(__dirname, "components/icons")],
          use: [
            {
              loader: "@svgr/webpack",
              options: {
                icon: true,
                typescript: true,
                svgProps: {
                  "aria-hidden": true,
                  className: "icon",
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
        { source: "/dark-mode-example/:path*", destination: "https://jakejarvis.github.io/dark-mode-example/:path*" },
      ],
      redirects: async () => [
        { source: "/notes/:slug/amp.html", destination: "/notes/:slug/", statusCode: 301 },
        { source: "/resume/", destination: "/static/resume.pdf", permanent: false },
        { source: "/stats/", destination: "https://app.usefathom.com/share/wbgnqukw/jarv.is", permanent: false },
        { source: "/scrabble/:path*", destination: "https://jakejarvis.github.io/scrabble/:path*", permanent: false },
        { source: "/jarvis.asc", destination: "/pubkey.asc", permanent: true },
        { source: "/index.xml", destination: "/feed.xml", permanent: true },
        { source: "/feed/", destination: "/feed.xml", permanent: true },
        { source: "/rss/", destination: "/feed.xml", permanent: true },
        { source: "/blog/:path*", destination: "/notes/", permanent: true },
        { source: "/archives/:path*", destination: "/notes/", permanent: true },
        {
          source: "/2013/11/21/no-homo-still-raps-motto/",
          destination: "/notes/no-homo-still-raps-motto/",
          permanent: true,
        },
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
          source: "/2018/12/07/shrinking-a-linux-virtual-disk-with-vmware/",
          destination: "/notes/how-to-shrink-linux-virtual-disk-vmware/",
          permanent: true,
        },
        {
          source: "/2018/12/10/cool-bash-tricks-for-your-terminal-dotfiles/",
          destination: "/notes/cool-bash-tricks-for-your-terminal-dotfiles/",
          permanent: true,
        },
      ],
    }
  )(phase, { defaultConfig });
};
