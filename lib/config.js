// Site info
export const siteName = "Jake Jarvis";
export const siteDomain = "jarv.is";
export const shortDescription = "Front-End Web Developer in Boston, MA 👨‍💻";
export const longDescription =
  "Hi there! I'm a frontend web developer based in Boston, Massachusetts specializing in the JAMstack, modern JavaScript frameworks, and progressive web apps.";
export const githubRepo = "jakejarvis/jarv.is";
export const fathomSiteId = "WBGNQUKW";

let baseURL = ""; // default to relative URLs
if (process.env.NEXT_PUBLIC_VERCEL_ENV === "production") {
  // vercel production (set manually above)
  baseURL = `https://${siteDomain}`;
} else if (process.env.NEXT_PUBLIC_VERCEL_URL) {
  // vercel deploy previews
  baseURL = `https://${process.env.NEXT_PUBLIC_VERCEL_URL}`;
}
export { baseURL };

// Me info
export const authorName = "Jake Jarvis";
export const twitterHandle = "jakejarvis";
export const facebookAppId = "3357248167622283";
export const webmentionId = "jarv.is";
export const monetization = "$ilp.uphold.com/BJp6d2FrEB69";

// ...note / TODO: there is still a metric poop ton of this kind of info hard-coded.
