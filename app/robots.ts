import type { MetadataRoute } from "next";

const robots = (): MetadataRoute.Robots => {
  // this production check should be unnecessary because "noindex" and "nofollow" are also set in a meta tag (see
  // DefaultSeo's props in pages/_app.tsx), but it doesn't hurt...
  if (process.env.NEXT_PUBLIC_VERCEL_ENV !== "production") {
    return {
      rules: {
        userAgent: "*",
        disallow: "/",
      },
    };
  }

  const naughtySpiders = [
    "CCBot",
    "Google-Extended",
    "GPTBot",
    "ChatGPT-User",
    "anthropic-ai",
    "ClaudeBot",
    "Bytespider",
  ];

  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
      },
      ...naughtySpiders.map((userAgent) => ({
        userAgent,
        disallow: "/",
      })),
    ],
    sitemap: `${process.env.NEXT_PUBLIC_BASE_URL || ""}/sitemap.xml`,
  };
};

export default robots;
