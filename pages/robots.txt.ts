import type { GetServerSideProps } from "next";

export const getServerSideProps: GetServerSideProps<Record<string, never>> = async (context) => {
  const { res } = context;

  // this production check should be unnecessary because "noindex" and "nofollow" are also set in a meta tag (see
  // DefaultSeo's props in pages/_app.tsx), but it doesn't hurt...
  const robots = `User-agent: *
${
  process.env.NEXT_PUBLIC_VERCEL_ENV !== "production"
    ? `Disallow: /`
    : `Allow: /

# I'm already _so_ over this shit...
# https://github.com/ai-robots-txt/ai.robots.txt/blob/main/robots.txt
User-agent: AdsBot-Google
User-agent: Amazonbot
User-agent: anthropic-ai
User-agent: Applebot-Extended
User-agent: Bytespider
User-agent: CCBot
User-agent: ChatGPT-User
User-agent: Claude-Web
User-agent: ClaudeBot
User-agent: cohere-ai
User-agent: Diffbot
User-agent: FacebookBot
User-agent: FriendlyCrawler
User-agent: Google-Extended
User-agent: GPTBot
User-agent: img2dataset
User-agent: omgili
User-agent: omgilibot
User-agent: peer39_crawler
User-agent: peer39_crawler/1.0
User-agent: PerplexityBot
User-agent: YouBot
User-agent: AhrefsBot
User-agent: BLEXBot
User-agent: DataForSeoBot
User-agent: magpie-crawler
User-agent: MJ12bot
User-agent: TurnitinBot
Disallow: /`
}

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
