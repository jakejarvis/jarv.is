import { baseUrl } from "../lib/config";
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

Sitemap: ${baseUrl}/sitemap.xml`
}
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
