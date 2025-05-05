import Link from "@/components/link";
import Time from "@/components/time";
import { getFrontMatter } from "@/lib/posts";
import { createMetadata } from "@/lib/metadata";
import authorConfig from "@/lib/config/author";
import { POSTS_DIR } from "@/lib/config/constants";
import type { ReactElement } from "react";
import type { FrontMatter } from "@/lib/posts";

export const metadata = createMetadata({
  title: "Notes",
  description: `Recent posts by ${authorConfig.name}.`,
  canonical: `/${POSTS_DIR}`,
});

const Page = async () => {
  // parse the year of each post and group them together
  const posts = await getFrontMatter();
  const postsByYear: {
    [year: string]: FrontMatter[];
  } = {};

  posts.forEach((post) => {
    const year = new Date(post.date).getUTCFullYear();
    (postsByYear[year] || (postsByYear[year] = [])).push(post);
  });

  const sections: ReactElement[] = [];

  Object.entries(postsByYear).forEach(([year, posts]) => {
    sections.push(
      <section className="my-8 first-of-type:mt-0" key={year}>
        <h2 className="mt-0 mb-4 text-3xl font-bold md:text-4xl">{year}</h2>
        <ul>
          {posts.map(({ slug, date, title, htmlTitle }) => (
            <li className="mb-4 flex text-base leading-relaxed last-of-type:mb-0" key={slug}>
              <Time date={date} format="MMM d" className="text-muted-foreground w-22 shrink-0" />
              <span>
                <Link
                  dynamicOnHover
                  href={`/${POSTS_DIR}/${slug}`}
                  dangerouslySetInnerHTML={{ __html: htmlTitle || title }}
                />
              </span>
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
