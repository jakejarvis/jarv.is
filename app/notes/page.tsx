import Link from "../../components/Link";
import Time from "../../components/Time";
import { getAllPosts } from "../../lib/helpers/posts";
import { addMetadata } from "../../lib/helpers/metadata";
import * as config from "../../lib/config";
import type { ReactElement } from "react";
import type { Route } from "next";
import type { FrontMatter } from "../../lib/helpers/posts";

import styles from "./page.module.css";

export const metadata = addMetadata({
  title: "Notes",
  description: `Recent posts by ${config.authorName}.`,
  alternates: {
    canonical: "/notes",
  },
});

const Page = async () => {
  // parse the year of each note and group them together
  const notes = await getAllPosts();
  const notesByYear: {
    [year: string]: FrontMatter[];
  } = {};

  notes.forEach((note) => {
    const year = new Date(note.date).getUTCFullYear();
    (notesByYear[year] || (notesByYear[year] = [])).push(note);
  });

  const sections: ReactElement[] = [];

  Object.entries(notesByYear).forEach(([year, posts]) => {
    sections.push(
      <section className={styles.section} key={year}>
        <h2 className={styles.year}>{year}</h2>
        <ul className={styles.list}>
          {posts.map(({ slug, date, title, htmlTitle }) => (
            <li className={styles.post} key={slug}>
              <Time date={date} format="MMM d" className={styles.postDate} />
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

  return reversed;
};

export default Page;
