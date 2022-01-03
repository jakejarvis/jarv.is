const config = require("./lib/config");

module.exports = {
  siteUrl: config.baseUrl || "https://jarv.is",
  generateRobotsTxt: true,
  sitemapSize: 99,
};
