import Script from "next/script";

const Analytics = () => {
  if (!process.env.NEXT_PUBLIC_UMAMI_WEBSITE_ID || process.env.NEXT_PUBLIC_VERCEL_ENV !== "production") {
    return null;
  }

  return (
    <Script
      src="/_stream/u/script.js" // see next.config.ts rewrite
      strategy="afterInteractive"
      data-website-id={process.env.NEXT_PUBLIC_UMAMI_WEBSITE_ID}
      data-domains={process.env.NEXT_PUBLIC_VERCEL_PROJECT_PRODUCTION_URL}
    />
  );
};

export default Analytics;
