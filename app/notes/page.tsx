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

// Component for dynamic stats (views/comments)
const PostStats = async ({ slug }: { slug: string }) => {
  const [views, comments] = await Promise.all([getViewCounts(), getCommentCounts()]);

  const postViews = views[`${POSTS_DIR}/${slug}`] || 0;
  const postComments = comments[`${POSTS_DIR}/${slug}`] || 0;

  return (
    <>
      {postViews > 0 && (
        <span className="bg-muted text-foreground/65 inline-flex h-5 flex-nowrap items-center gap-1 rounded-md px-1.5 align-text-top text-xs font-semibold text-nowrap shadow select-none">
          <EyeIcon className="inline-block size-4 shrink-0" />
          <span className="inline-block leading-none">
            {Intl.NumberFormat(env.NEXT_PUBLIC_SITE_LOCALE).format(postViews)}
          </span>
        </span>
      )}

      {postComments > 0 && (
        <Link
          href={`/${POSTS_DIR}/${slug}#comments`}
          title={`${Intl.NumberFormat(env.NEXT_PUBLIC_SITE_LOCALE).format(postComments)} ${postComments === 1 ? "comment" : "comments"}`}
          className="inline-flex hover:no-underline"
        >
          <span className="bg-muted text-foreground/65 inline-flex h-5 flex-nowrap items-center gap-1 rounded-md px-1.5 align-text-top text-xs font-semibold text-nowrap shadow select-none">
            <MessagesSquareIcon className="inline-block size-3 shrink-0" />
            <span className="inline-block leading-none">
              {Intl.NumberFormat(env.NEXT_PUBLIC_SITE_LOCALE).format(postComments)}
            </span>
          </span>
        </Link>
      )}
    </>
  );
};

const Page = async () => {
  // Only fetch the posts, not the dynamic stats
  const posts = await getFrontMatter();

  const postsByYear: {
    [year: string]: (FrontMatter & { dateISO: string; dateTitle: string; dateDisplay: string })[];
  } = {};

  posts.forEach((post) => {
    const year = new Date(post.date).getUTCFullYear();
    (postsByYear[year] || (postsByYear[year] = [])).push({
      ...post,
      // Pre-compute formatted dates to avoid date-fns calling new Date() during render
      dateISO: formatDateISO(post.date),
      dateTitle: formatDate(post.date, "MMM d, y, h:mm a O"),
      dateDisplay: formatDate(post.date, "MMM d"),
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
          {posts.map(({ slug, dateISO, dateTitle, dateDisplay, title, htmlTitle }) => (
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

                <Suspense fallback={null}>
                  <PostStats slug={slug} />
                </Suspense>
              </div>
            </li>
          ))}
        </ul>
      </section>
    );
  });

  // grouped posts enter this component ordered chronologically -- we want reverse chronological
  const reversed = sections.reverse();

  return <>{reversed}</>;
};

export default Page;
