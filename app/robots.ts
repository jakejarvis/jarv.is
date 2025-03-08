import config from "../lib/config/constants";
import type { MetadataRoute } from "next";

export const dynamic = "force-static";

const robots = (): MetadataRoute.Robots => {
  // I'm already _so_ over this shit...
  // https://github.com/ai-robots-txt/ai.robots.txt/blob/main/robots.txt
  // TODO: dynamically fetch this list from the above repo.
  const naughtySpiders = [
    "AI2Bot",
    "Ai2Bot-Dolma",
    "Amazonbot",
    "anthropic-ai",
    "Applebot",
    "Applebot-Extended",
    "Brightbot 1.0",
    "Bytespider",
    "CCBot",
    "ChatGPT-User",
    "Claude-Web",
    "ClaudeBot",
    "cohere-ai",
    "cohere-training-data-crawler",
    "Crawlspace",
    "Diffbot",
    "DuckAssistBot",
    "FacebookBot",
    "FriendlyCrawler",
    "Google-Extended",
    "GoogleOther",
    "GoogleOther-Image",
    "GoogleOther-Video",
    "GPTBot",
    "iaskspider/2.0",
    "ICC-Crawler",
    "ImagesiftBot",
    "img2dataset",
    "ISSCyberRiskCrawler",
    "Kangaroo Bot",
    "Meta-ExternalAgent",
    "Meta-ExternalFetcher",
    "OAI-SearchBot",
    "omgili",
    "omgilibot",
    "PanguBot",
    "PerplexityBot",
    "PetalBot",
    "Scrapy",
    "SemrushBot-OCOB",
    "SemrushBot-SWA",
    "Sidetrade indexer bot",
    "Timpibot",
    "VelenPublicWebCrawler",
    "Webzio-Extended",
    "YouBot",
    "AhrefsBot",
    "BLEXBot",
    "DataForSeoBot",
    "magpie-crawler",
    "MJ12bot",
    "TurnitinBot",
  ];

  return {
    rules: [
      {
        userAgent: "*",
        // block access to staging sites
        [process.env.NEXT_PUBLIC_VERCEL_ENV === "production" ? "allow" : "disallow"]: "/",
      },
      {
        userAgent: naughtySpiders,
        disallow: "/",
      },
    ],
    sitemap: `${config.baseUrl}/sitemap.xml`,
  };
};

export default robots;
