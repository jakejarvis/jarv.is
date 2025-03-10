const constants = {
  // Site info
  siteName: "Jake Jarvis",
  siteLocale: "en-US",
  baseUrl:
    process.env.NEXT_PUBLIC_VERCEL_ENV === "production" && process.env.NEXT_PUBLIC_VERCEL_PROJECT_PRODUCTION_URL
      ? `https://${process.env.NEXT_PUBLIC_VERCEL_PROJECT_PRODUCTION_URL}`
      : process.env.NEXT_PUBLIC_VERCEL_ENV === "preview" && process.env.NEXT_PUBLIC_VERCEL_URL
        ? `https://${process.env.NEXT_PUBLIC_VERCEL_URL}`
        : `http://localhost:${process.env.PORT || 3000}`,
  timeZone: "America/New_York", // https://en.wikipedia.org/wiki/List_of_tz_database_time_zones#List
  onionDomain: "http://jarvis2i2vp4j4tbxjogsnqdemnte5xhzyi7hziiyzxwge3hzmh57zad.onion",
  shortDescription: "Front-End Web Developer in Boston, MA",
  longDescription:
    "Hi there! I'm a frontend web developer based in Boston, Massachusetts specializing in the JAMstack, modern JavaScript frameworks, and progressive web apps.",
  license: "Creative Commons Attribution 4.0 International",
  licenseAbbr: "CC-BY-4.0",
  licenseUrl: "https://creativecommons.org/licenses/by/4.0/",
  copyrightYearStart: 2001,
  githubRepo: "jakejarvis/jarv.is",

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
    mastodon: "fediverse.jarv.is/@jake",
    bluesky: "jarv.is",
  },
};

export default constants;
