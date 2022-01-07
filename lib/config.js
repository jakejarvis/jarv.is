// do not convert to ESM -- this needs to be imported in CJS files like next.config.js too
module.exports = {
  // Site info
  siteName: "Jake Jarvis",
  siteDomain: "jarv.is",
  siteLocale: "en_us",
  baseUrl: process.env.BASE_URL || "https://jarv.is",
  onionDomain: "http://jarvis2i2vp4j4tbxjogsnqdemnte5xhzyi7hziiyzxwge3hzmh57zad.onion",
  shortDescription: "Front-End Web Developer in Boston, MA",
  longDescription:
    "Hi there! I'm a frontend web developer based in Boston, Massachusetts specializing in the JAMstack, modern JavaScript frameworks, and progressive web apps.",
  githubRepo: "jakejarvis/jarv.is",
  facebookAppId: "3357248167622283",
  verifyGoogle: "qQhmLTwjNWYgQ7W42nSTq63xIrTch13X_11mmxBE9zk",
  verifyBing: "164551986DA47F7F6FC0D21A93FFFCA6",
  verifyFacebook: "q45jxbgyp22ef55xror1pvbehisg9m",
  monetization: "$ilp.uphold.com/BJp6d2FrEB69",
  fathomSiteId: "WBGNQUKW",
  fathomCustomScript: "https://blue-chilly.jarv.is/script.js",
  webmentionId: "jarv.is",

  // Me info
  authorName: "Jake Jarvis",
  authorEmail: "jake@jarv.is",
  authorSocial: {
    github: "jakejarvis",
    twitter: "jakejarvis",
    facebook: "jakejarvis",
    keybase: "jakejarvis",
    medium: "jakejarvis",
    linkedin: "jakejarvis",
    instagram: "jakejarvis",
    mastodon: "mastodon.social/@jakejarvis",
  },

  // Next.js constants
  NOTES_DIR: "./notes",

  // ...note / TODO: there is still a metric poop ton of this kind of info hard-coded.
};
