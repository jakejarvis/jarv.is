import { BASE_URL } from "../lib/config/constants";
import type { MetadataRoute } from "next";

export const dynamic = "force-static";

const robots = (): MetadataRoute.Robots => ({
  rules: [
    {
      userAgent: "*",
      disallow: ["/_stream/", "/api/", "/stats/", "/tweets/", "/404", "/500"],
    },
  ],
  sitemap: `${BASE_URL}/sitemap.xml`,
});

export default robots;
