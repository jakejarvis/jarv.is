// do not convert to ESM and/or TS -- this needs to be imported in CJS files like next.config.js too
module.exports = {
  // Site info
  siteName: "Jake Jarvis",
  siteDomain: "jarv.is",
  siteLocale: "en_us",
  baseUrl:
    process.env.NEXT_PUBLIC_VERCEL_ENV === "production"
      ? "https://jarv.is"
      : process.env.NEXT_PUBLIC_VERCEL_URL
      ? `https://${process.env.NEXT_PUBLIC_VERCEL_URL}`
      : process.env.IS_DEV_SERVER
      ? "http://localhost:3000"
      : "", // fallback to relative URLs
  onionDomain: "http://jarvis2i2vp4j4tbxjogsnqdemnte5xhzyi7hziiyzxwge3hzmh57zad.onion",
  shortDescription: "Front-End Web Developer in Boston, MA",
  longDescription:
    "Hi there! I'm a frontend web developer based in Boston, Massachusetts specializing in the JAMstack, modern JavaScript frameworks, and progressive web apps.",
  githubRepo: "jakejarvis/jarv.is",
  verifyGoogle: "qQhmLTwjNWYgQ7W42nSTq63xIrTch13X_11mmxBE9zk",
  verifyBing: "164551986DA47F7F6FC0D21A93FFFCA6",
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
};
