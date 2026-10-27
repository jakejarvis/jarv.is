import { createFileRoute, Link } from "@tanstack/react-router";

import { PageTitle } from "@/components/layout/page-title";
import { PostStats } from "@/components/post-stats";
import authorConfig from "@/lib/config/author";
import { createHead } from "@/lib/metadata";
import { type FrontMatter, getFrontMatter } from "@/lib/posts";

const PostsList = () => {
  const posts = getFrontMatter();

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
        <h2 id={year} className="mt-0 mb-4 text-xl font-semibold">
          {year}
        </h2>
        <ul className="space-y-4">
          {yearPosts.map(({ slug, dateISO, dateTitle, dateDisplay, title, htmlTitle }) => (
            <li className="flex text-sm leading-relaxed" key={slug}>
              <span className="w-18 shrink-0 text-muted-foreground md:w-22">
                <time dateTime={dateISO} title={dateTitle} suppressHydrationWarning>
                  {dateDisplay}
                </time>
              </span>
              <div className="space-x-2">
                <Link
                  to="/notes/$slug"
                  params={{ slug }}
                  dangerouslySetInnerHTML={{ __html: htmlTitle || title }}
                  className="mr-2.5 underline-offset-4 hover:underline"
                />

                <PostStats slug={`notes/${slug}`} />
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

const Page = () => (
  <>
    <PageTitle canonical="/notes">Notes</PageTitle>
    <PostsList />
  </>
);

export const Route = createFileRoute("/notes/")({
  head: () =>
    createHead({
      title: "Notes",
      description: `Recent posts by ${authorConfig.name}.`,
      canonical: "/notes",
    }),
  component: Page,
});
