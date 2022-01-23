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
  themeColors: {
    // used for `<meta name="theme-color" ...>`, should be the same as CSS `--background-outer` var in styles/colors.css
    light: "#fcfcfc",
    dark: "#252525",
  },
  githubRepo: "jakejarvis/jarv.is",
  verifyGoogle: "qQhmLTwjNWYgQ7W42nSTq63xIrTch13X_11mmxBE9zk",
  verifyBing: "164551986DA47F7F6FC0D21A93FFFCA6",
  verifyFacebook: "q45jxbgyp22ef55xror1pvbehisg9m",
  monetization: "$ilp.uphold.com/BJp6d2FrEB69",
  fathomSiteId: "WBGNQUKW",
  webmentionId: "jarv.is",
  giscusConfig: {
    // https://github.com/giscus/giscus-component/tree/main/packages/react#readme
    repo: "jakejarvis/jarv.is",
    repoId: "MDEwOlJlcG9zaXRvcnk1MzM0MDgxMQ==",
    category: "Comments",
    categoryId: "DIC_kwDOAy3qi84CAsjS",
  },

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
  },

  // Next.js constants
  NOTES_DIR: "./notes",

  // ...note / TODO: there is still a metric poop ton of this kind of info hard-coded.
};
