module.exports = {
  siteUrl:
    process.env.NEXT_PUBLIC_VERCEL_ENV === "production"
      ? "https://jarv-is-next.vercel.app"
      : `https://${process.env.NEXT_PUBLIC_VERCEL_URL}`,
  generateRobotsTxt: true,
  sitemapSize: 99,
};
