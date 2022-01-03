const config = require("./lib/config");

module.exports = {
  siteUrl: config.baseUrl || "",
  generateRobotsTxt: true,
  sitemapSize: 99,
};
