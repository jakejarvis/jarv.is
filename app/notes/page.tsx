import Link from "next/link";
import PageTitle from "@/components/layout/page-title";
import PostStats from "@/components/post-stats";
import { getFrontMatter, POSTS_DIR, type FrontMatter } from "@/lib/posts";
import { createMetadata } from "@/lib/metadata";
import authorConfig from "@/lib/config/author";

export const metadata = createMetadata({
  title: "Notes",
  description: `Recent posts by ${authorConfig.name}.`,
  canonical: `/${POSTS_DIR}`,
});

const PostsList = async () => {
  const posts = await getFrontMatter();

  const formattedPosts = posts.map((post) => {
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
      dateDisplay: d.toLocaleDateString("en-US", { month: "short", day: "numeric" }),
    };
  });

  const postsByYear: {
    [year: string]: (FrontMatter & {
      year: number;
      dateISO: string;
      dateTitle: string;
      dateDisplay: string;
    })[];
  } = {};

  formattedPosts.forEach((post) => {
    (postsByYear[post.year] || (postsByYear[post.year] = [])).push(post);
  });

  const sections: React.ReactNode[] = [];

  Object.entries(postsByYear).forEach(([year, posts]) => {
    sections.push(
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
              <div className="space-x-2.5">
                {/* htmlTitle is sanitized by rehypeSanitize in lib/posts.ts with strict allowlist: only code, em, strong tags */}
                <Link
                  href={`/${POSTS_DIR}/${slug}`}
                  dangerouslySetInnerHTML={{ __html: htmlTitle || title }}
                  className="underline-offset-4 hover:underline"
                  style={{ viewTransitionName: `note-title-${slug}` }}
                />

                <PostStats slug={`${POSTS_DIR}/${slug}`} />
              </div>
            </li>
          ))}
        </ul>
      </section>
    );
  });

  // grouped posts enter this component ordered chronologically -- we want reverse chronological
  return <>{sections.reverse()}</>;
};

const Page = async () => {
  return (
    <>
      <PageTitle canonical="/notes">Notes</PageTitle>
      <PostsList />
    </>
  );
};

export default Page;
