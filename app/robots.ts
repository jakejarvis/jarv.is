import { env } from "../lib/env";
import type { MetadataRoute } from "next";

const robots = (): MetadataRoute.Robots => ({
  rules: [
    {
      userAgent: "*",
      disallow: ["/api/", "/404", "/500"],
    },
  ],
  sitemap: `${env.NEXT_PUBLIC_BASE_URL}/sitemap.xml`,
});

export default robots;
