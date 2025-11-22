import { env } from "@/lib/env";
import { Suspense } from "react";
import { EyeIcon, MessagesSquareIcon } from "lucide-react";
import Link from "@/components/link";
import { getFrontMatter, POSTS_DIR, type FrontMatter } from "@/lib/posts";
import { createMetadata } from "@/lib/metadata";
import { formatDate, formatDateISO } from "@/lib/date";
import authorConfig from "@/lib/config/author";
import { getViewCounts } from "@/lib/views";
import { getCommentCounts } from "@/lib/server/comments";

export const metadata = createMetadata({
  title: "Notes",
  description: `Recent posts by ${authorConfig.name}.`,
  canonical: `/${POSTS_DIR}`,
});

// Non-async component for displaying stats (receives data as props)
const PostStats = ({ views, comments, slug }: { views: number; comments: number; slug: string }) => {
  return (
    <>
      {views > 0 && (
        <span className="bg-muted text-foreground/65 inline-flex h-5 flex-nowrap items-center gap-1 rounded-md px-1.5 align-text-top text-xs font-semibold text-nowrap shadow select-none">
          <EyeIcon className="inline-block size-4 shrink-0" />
          <span className="inline-block leading-none">
            {Intl.NumberFormat(env.NEXT_PUBLIC_SITE_LOCALE).format(views)}
          </span>
        </span>
      )}

      {comments > 0 && (
        <Link
          href={`/${POSTS_DIR}/${slug}#comments`}
          title={`${Intl.NumberFormat(env.NEXT_PUBLIC_SITE_LOCALE).format(comments)} ${comments === 1 ? "comment" : "comments"}`}
          className="inline-flex hover:no-underline"
        >
          <span className="bg-muted text-foreground/65 inline-flex h-5 flex-nowrap items-center gap-1 rounded-md px-1.5 align-text-top text-xs font-semibold text-nowrap shadow select-none">
            <MessagesSquareIcon className="inline-block size-3 shrink-0" />
            <span className="inline-block leading-none">
              {Intl.NumberFormat(env.NEXT_PUBLIC_SITE_LOCALE).format(comments)}
            </span>
          </span>
        </Link>
      )}
    </>
  );
};

// Async component that fetches all stats once and renders the full page
const PostsList = async () => {
  // Fetch posts and stats in parallel (only once per page load)
  const [posts, views, comments] = await Promise.all([getFrontMatter(), getViewCounts(), getCommentCounts()]);

  const postsByYear: {
    [year: string]: (FrontMatter & {
      dateISO: string;
      dateTitle: string;
      dateDisplay: string;
      views: number;
      comments: number;
    })[];
  } = {};

  posts.forEach((post) => {
    const year = new Date(post.date).getUTCFullYear();
    (postsByYear[year] || (postsByYear[year] = [])).push({
      ...post,
      // Pre-compute formatted dates to avoid date-fns calling new Date() during render
      dateISO: formatDateISO(post.date),
      dateTitle: formatDate(post.date, "MMM d, y, h:mm a O"),
      dateDisplay: formatDate(post.date, "MMM d"),
      // Include pre-fetched stats
      views: views[`${POSTS_DIR}/${post.slug}`] || 0,
      comments: comments[`${POSTS_DIR}/${post.slug}`] || 0,
    });
  });

  const sections: React.ReactNode[] = [];

  Object.entries(postsByYear).forEach(([year, posts]) => {
    sections.push(
      <section className="my-8 first-of-type:mt-6 last-of-type:mb-6" key={year}>
        <h2 id={year} className="mt-0 mb-4 text-3xl font-bold md:text-4xl">
          {year}
        </h2>
        <ul className="space-y-4">
          {posts.map(({ slug, dateISO, dateTitle, dateDisplay, title, htmlTitle, views, comments }) => (
            <li className="flex text-base leading-relaxed" key={slug}>
              <span className="text-muted-foreground w-18 shrink-0 md:w-22">
                <time dateTime={dateISO} title={dateTitle}>
                  {dateDisplay}
                </time>
              </span>
              <div className="space-x-2.5">
                <Link
                  dynamicOnHover
                  href={`/${POSTS_DIR}/${slug}`}
                  dangerouslySetInnerHTML={{ __html: htmlTitle || title }}
                />

                <PostStats slug={slug} views={views} comments={comments} />
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

const Page = () => {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <PostsList />
    </Suspense>
  );
};

export default Page;
