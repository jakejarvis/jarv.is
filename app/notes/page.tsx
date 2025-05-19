import { env } from "@/lib/env";
import { EyeIcon } from "lucide-react";
import Link from "@/components/link";
import { getFrontMatter, POSTS_DIR, type FrontMatter } from "@/lib/posts";
import { createMetadata } from "@/lib/metadata";
import { formatDate, formatDateISO } from "@/lib/date";
import authorConfig from "@/lib/config/author";
import { getViews } from "@/lib/views";

export const revalidate = 300; // 5 minutes

export const metadata = createMetadata({
  title: "Notes",
  description: `Recent posts by ${authorConfig.name}.`,
  canonical: `/${POSTS_DIR}`,
});

const Page = async () => {
  // parse the year of each post and group them together
  const [posts, views] = await Promise.all([getFrontMatter(), getViews()]);

  const postsByYear: {
    [year: string]: (FrontMatter & { views: number })[];
  } = {};

  posts.forEach((post) => {
    const year = new Date(post.date).getUTCFullYear();
    (postsByYear[year] || (postsByYear[year] = [])).push({
      ...post,
      views: views[`${POSTS_DIR}/${post.slug}`] || 0,
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
          {posts.map(({ slug, date, title, htmlTitle, views }) => (
            <li className="flex text-base leading-relaxed" key={slug}>
              <span className="text-muted-foreground w-18 shrink-0 md:w-22">
                <time dateTime={formatDateISO(date)} title={formatDate(date, "MMM d, y, h:mm a O")}>
                  {formatDate(date, "MMM d")}
                </time>
              </span>
              <div className="space-x-2.5">
                <Link
                  dynamicOnHover
                  href={`/${POSTS_DIR}/${slug}`}
                  dangerouslySetInnerHTML={{ __html: htmlTitle || title }}
                />

                {views > 0 && (
                  <span className="bg-muted text-muted-foreground inline-flex h-5 flex-nowrap items-center gap-1 rounded-md px-1.5 align-text-top text-xs font-semibold text-nowrap shadow select-none">
                    <EyeIcon className="inline-block size-4 shrink-0" />
                    <span className="inline-block leading-none">
                      {Intl.NumberFormat(env.NEXT_PUBLIC_SITE_LOCALE).format(views)}
                    </span>
                  </span>
                )}
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
