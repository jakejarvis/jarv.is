import { Link, createFileRoute } from "@tanstack/react-router";
import { allPosts } from "content-collections";

import { PageTitle } from "@/components/layout/page-title";
import { PostStats, PostStatsProvider } from "@/components/post-stats";
import authorConfig from "@/lib/config/author";
import { createHead } from "@/lib/head";

export const Route = createFileRoute("/notes/")({
  head: () =>
    createHead({
      title: "Notes",
      description: `Recent posts by ${authorConfig.name}.`,
      canonical: "/notes",
    }),
  component: NotesPage,
});

function NotesPage() {
  const formattedPosts = allPosts
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
    // eslint-disable-next-line oxc/no-map-spread -- content-collections objects shouldn't be mutated
    .map((post) => {
      const d = new Date(post.date);
      return {
        ...post,
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
      };
    });

  const postsByYear: Record<string, typeof formattedPosts> = {};
  for (const post of formattedPosts) {
    if (!postsByYear[post.year]) {
      postsByYear[post.year] = [];
    }
    postsByYear[post.year].push(post);
  }

  return (
    <>
      <PageTitle canonical="/notes">Notes</PageTitle>

      <PostStatsProvider>
        {Object.entries(postsByYear)
          .toReversed()
          .map(([year, posts]) => (
            <section className="my-8 first-of-type:mt-0 last-of-type:mb-0" key={year}>
              <h2 id={year} className="mt-0 mb-4 text-2xl font-semibold tracking-tight">
                {year}
              </h2>
              <ul className="space-y-4">
                {posts.map(({ slug, dateISO, dateTitle, dateDisplay, title, htmlTitle }) => (
                  <li className="flex text-base leading-relaxed" key={slug}>
                    <span className="text-muted-foreground w-18 shrink-0 md:w-22">
                      <time dateTime={dateISO} title={dateTitle} suppressHydrationWarning>
                        {dateDisplay}
                      </time>
                    </span>
                    <div className="space-x-2">
                      <Link
                        to="/notes/$slug"
                        params={{ slug }}
                        // biome-ignore lint/security/noDangerouslySetInnerHtml: htmlTitle is sanitized by rehypeSanitize
                        dangerouslySetInnerHTML={{
                          __html: htmlTitle || title,
                        }}
                        className="mr-2.5 underline-offset-4 hover:underline"
                        style={{
                          viewTransitionName: `note-title-${slug}`,
                        }}
                      />

                      <PostStats slug={`notes/${slug}`} />
                    </div>
                  </li>
                ))}
              </ul>
            </section>
          ))}
      </PostStatsProvider>
    </>
  );
}
