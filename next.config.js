/**
 * @type {import('next').NextConfig}
 */

const withBundleAnalyzer = require("@next/bundle-analyzer")({
  enabled: process.env.ANALYZE === "true",
});

module.exports = withBundleAnalyzer({
  i18n: {
    locales: ["en-us"],
    defaultLocale: "en-us",
    localeDetection: false,
  },
  swcMinify: true,
  reactStrictMode: true,
  trailingSlash: true,
  productionBrowserSourceMaps: true,
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
      use: [
        {
          loader: "@svgr/webpack",
          options: {
            typescript: true,
            svgProps: {
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
          value: "http://jarvis2i2vp4j4tbxjogsnqdemnte5xhzyi7hziiyzxwge3hzmh57zad.onion/:path*",
        },
        {
          // https://developer.chrome.com/blog/floc/#how-can-websites-opt-out-of-the-floc-computation
          key: "Permissions-Policy",
          value: "interest-cohort=()",
        },
        {
          key: "Referrer-Policy",
          value: "no-referrer-when-downgrade",
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
    { source: "/favicon.ico", destination: "/static/images/favicon.ico" },
    { source: "/apple-touch-icon.png", destination: "/static/images/apple-touch-icon.png" },
    { source: "/apple-touch-icon-precomposed.png", destination: "/static/images/apple-touch-icon.png" },
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
});
