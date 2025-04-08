import { BASE_URL } from "../lib/config/constants";
import type { MetadataRoute } from "next";

const robots = (): MetadataRoute.Robots => ({
  rules: [
    {
      userAgent: "*",
      disallow: ["/_stream/", "/api/", "/404", "/500"],
    },
  ],
  sitemap: `${BASE_URL}/sitemap.xml`,
});

export default robots;
