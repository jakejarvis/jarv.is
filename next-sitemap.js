module.exports = {
  siteUrl:
    process.env.NEXT_PUBLIC_VERCEL_ENV === "production"
      ? "https://jarv.is"
      : `https://${process.env.NEXT_PUBLIC_VERCEL_URL}`,
  generateRobotsTxt: true,
  sitemapSize: 99,
};
