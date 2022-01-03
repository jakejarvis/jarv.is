const config = require("./lib/config");

module.exports = {
  siteUrl: config.baseUrl || "",
  changefreq: "weekly",
  exclude: ["/feed.xml", "/feed.atom", "/site.webmanifest"],
};
