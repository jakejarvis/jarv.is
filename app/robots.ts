import { BASE_URL } from "../lib/config/constants";
import type { MetadataRoute } from "next";

export const dynamic = "force-static";

const robots = (): MetadataRoute.Robots => ({
  rules: [
    {
      userAgent: "*",
      // block access to staging sites
      [process.env.NEXT_PUBLIC_VERCEL_ENV === "production" ? "allow" : "disallow"]: "/",
    },
  ],
  sitemap: `${BASE_URL}/sitemap.xml`,
});

export default robots;
