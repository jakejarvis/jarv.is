import Link from "next/link";
import { ViewTransition } from "react";

import { PageTitle } from "@/components/layout/page-title";
import { DirectionalTransition } from "@/components/page-transition";
import { PostStats, PostStatsProvider } from "@/components/post-stats";
import authorConfig from "@/lib/config/author";
import { createMetadata } from "@/lib/metadata";
import { type FrontMatter, getFrontMatter, POSTS_DIR } from "@/lib/posts";

export const metadata = createMetadata({
  title: "Notes",
  description: `Recent posts by ${authorConfig.name}.`,
  canonical: `/${POSTS_DIR}`,
});

const PostsList = async () => {
  const posts = await getFrontMatter();

  const formattedPosts = posts.map((post) => {
    const d = new Date(post.date);
    return Object.assign(post, {
      year: d.getUTCFullYear(),
      dateISO: d.toISOString(),
      dateTitle: d.toLocaleString("en-US", {
        month: "short",
        day: "numeric",
        year: "numeric",
        hour: "numeric",
        minute: "2-digit",
        timeZoneName: "short",
      }),
      dateDisplay: d.toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
      }),
    });
  });

  const postsByYear: {
    [year: string]: (FrontMatter & {
      year: number;
      dateISO: string;
      dateTitle: string;
      dateDisplay: string;
    })[];
  } = {};

  for (const post of formattedPosts) {
    if (!postsByYear[post.year]) {
      postsByYear[post.year] = [];
    }
    postsByYear[post.year].push(post);
  }

  const sections: React.ReactNode[] = [];

  Object.entries(postsByYear).forEach(([year, yearPosts]) => {
    sections.push(
      <section className="my-8 first-of-type:mt-0 last-of-type:mb-0" key={year}>
        <h2 id={year} className="mt-0 mb-4 text-xl font-semibold tracking-tight">
          {year}
        </h2>
        <ul className="space-y-4">
          {yearPosts.map(({ slug, dateISO, dateTitle, dateDisplay, title, htmlTitle }) => (
            <li className="flex text-sm leading-relaxed" key={slug}>
              <span className="text-muted-foreground w-18 shrink-0 md:w-22">
                <time dateTime={dateISO} title={dateTitle} suppressHydrationWarning>
                  {dateDisplay}
                </time>
              </span>
              <div className="space-x-2">
                <ViewTransition name={`note-title-${slug}`} share="text-morph" default="none">
                  <Link
                    href={`/${POSTS_DIR}/${slug}`}
                    transitionTypes={["nav-forward"]}
                    dangerouslySetInnerHTML={{ __html: htmlTitle || title }}
                    className="mr-2.5 underline-offset-4 hover:underline"
                  />
                </ViewTransition>

                <PostStats slug={`${POSTS_DIR}/${slug}`} />
              </div>
            </li>
          ))}
        </ul>
      </section>,
    );
  });

  // grouped posts enter this component ordered chronologically -- we want reverse chronological
  return <>{sections.toReversed()}</>;
};

const Page = async () => (
  <DirectionalTransition>
    <PageTitle canonical="/notes">Notes</PageTitle>
    <PostStatsProvider>
      <PostsList />
    </PostStatsProvider>
  </DirectionalTransition>
);

export default Page;
