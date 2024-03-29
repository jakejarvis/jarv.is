import type { GetServerSideProps } from "next";

export const getServerSideProps: GetServerSideProps<Record<string, never>> = async (context) => {
  const { res } = context;

  // this production check should be unnecessary because "noindex" and "nofollow" are also set in a meta tag (see
  // DefaultSeo's props in pages/_app.tsx), but it doesn't hurt...
  const robots = `User-agent: *
${process.env.NEXT_PUBLIC_VERCEL_ENV !== "production" ? `Disallow: /` : `Allow: /`}

# Block CommonCrawl
User-agent: CCBot
Disallow: /

# Block Google Bard
User-agent: Google-Extended
Disallow: /

# Block OpenAI & ChatGPT
User-agent: GPTBot
Disallow: /
User-agent: ChatGPT-User
Disallow: /

# Block Anthropic AI
User-agent: anthropic-ai
Disallow: /
User-agent: ClaudeBot
Disallow: /

# Block ByteDance
User-agent: Bytespider
Disallow: /

Sitemap: ${process.env.NEXT_PUBLIC_BASE_URL || ""}/sitemap.xml
`;

  res.setHeader("content-type", "text/plain; charset=utf-8");
  // cache on edge for one week
  res.setHeader("cache-control", "public, max-age=0, s-maxage=604800, stale-while-revalidate");

  res.write(robots);
  res.end();

  return {
    props: {},
  };
};

// eslint-disable-next-line import/no-anonymous-default-export
export default () => null;
