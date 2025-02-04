import Link from "../Link";
import Time from "../Time";
import type { ReactElement } from "react";
import type { Route } from "next";
import type { PostsByYear } from "../../types";

import styles from "./PostsList.module.css";

export type PostsListProps = {
  postsByYear: PostsByYear;
};

const PostsList = ({ postsByYear }: PostsListProps) => {
  const sections: ReactElement[] = [];

  Object.entries(postsByYear).forEach(([year, posts]) => {
    sections.push(
      <section className={styles.section} key={year}>
        <h2 className={styles.year}>{year}</h2>
        <ul className={styles.list}>
          {posts.map(({ slug, date, title, htmlTitle }) => (
            <li className={styles.post} key={slug}>
              <Time date={date} format="MMM D" className={styles.postDate} />
              <span>
                <Link href={`/notes/${slug}` as Route} dangerouslySetInnerHTML={{ __html: htmlTitle || title }} />
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

export default PostsList;
