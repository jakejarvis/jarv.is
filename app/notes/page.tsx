import Link from "../../components/Link";
import Time from "../../components/Time";
import { getFrontMatter } from "../../lib/helpers/posts";
import { addMetadata } from "../../lib/helpers/metadata";
import * as config from "../../lib/config";
import { POSTS_DIR } from "../../lib/config/constants";
import type { ReactElement } from "react";
import type { FrontMatter } from "../../lib/helpers/posts";

import styles from "./page.module.css";

export const metadata = addMetadata({
  title: "Notes",
  description: `Recent posts by ${config.authorName}.`,
  alternates: {
    canonical: `/${POSTS_DIR}`,
  },
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
      <section className={styles.section} key={year}>
        <h2 className={styles.year}>{year}</h2>
        <ul className={styles.list}>
          {posts.map(({ slug, date, title, htmlTitle }) => (
            <li className={styles.post} key={slug}>
              <Time date={date} format="MMM d" className={styles.postDate} />
              <span>
                <Link href={`/${POSTS_DIR}/${slug}`} dangerouslySetInnerHTML={{ __html: htmlTitle || title }} />
              </span>
            </li>
          ))}
        </ul>
      </section>
    );
  });

  // grouped posts enter this component ordered chronologically -- we want reverse chronological
  const reversed = sections.reverse();

  return reversed;
};

export default Page;
