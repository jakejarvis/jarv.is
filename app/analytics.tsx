import { env } from "../lib/env";
import Script from "next/script";

const Analytics = () => {
  if (env.VERCEL_ENV !== "production") {
    return null;
  }

  if (!env.NEXT_PUBLIC_UMAMI_WEBSITE_ID) {
    return null;
  }

  return (
    <Script
      src="/_stream/u/script.js" // see next.config.ts rewrite
      id="umami-js"
      strategy="afterInteractive"
      data-website-id={env.NEXT_PUBLIC_UMAMI_WEBSITE_ID}
      data-domains={env.VERCEL_PROJECT_PRODUCTION_URL}
    />
  );
};

export default Analytics;
