import { env } from "@/lib/env";
import { EyeIcon } from "lucide-react";
import Link from "@/components/link";
import Time from "@/components/time";
import { getFrontMatter, getViews } from "@/lib/posts";
import { createMetadata } from "@/lib/metadata";
import authorConfig from "@/lib/config/author";
import { POSTS_DIR } from "@/lib/config/constants";
import type { ReactElement } from "react";
import type { FrontMatter } from "@/lib/posts";

export const revalidate = 600; // 10 minutes

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
      views: views[post.slug] || 0,
    });
  });

  const sections: ReactElement[] = [];

  Object.entries(postsByYear).forEach(([year, posts]) => {
    sections.push(
      <section className="my-8 first-of-type:mt-6 last-of-type:mb-6" key={year}>
        <h2 id={year} className="mt-0 mb-4 text-3xl font-bold md:text-4xl">
          {year}
        </h2>
        <ul className="space-y-4">
          {posts.map(({ slug, date, title, htmlTitle, views }) => (
            <li className="flex text-base leading-relaxed" key={slug}>
              <Time date={date} format="MMM d" className="text-muted-foreground w-18 shrink-0 md:w-22" />
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
