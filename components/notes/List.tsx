import Link from "next/link";
import Markdown from "markdown-to-jsx";
import { format } from "date-fns";

import styles from "./List.module.scss";

type NoteProps = {
  title: string;
  date: string;
  slug: string;
};

const List = ({ notesByYear }) => {
  const sections = [];

  Object.entries(notesByYear).forEach(([year, notes]: [string, NoteProps[]]) => {
    sections.push(
      <section key={year} className={styles.section}>
        <h2 className={styles.year}>{year}</h2>
        <ul className={styles.list}>
          {notes.map((note) => (
            <li key={note.slug} className={styles.row}>
              <span className={styles.date}>{format(new Date(note.date), "MMM d")}</span>
              <span>
                <Link
                  href={{
                    pathname: "/notes/[slug]/",
                    query: { slug: note.slug },
                  }}
                  prefetch={false}
                >
                  <a>
                    <Markdown options={{ disableParsingRawHTML: true, forceInline: true }}>{note.title}</Markdown>
                  </a>
                </Link>
              </span>
            </li>
          ))}
        </ul>
      </section>
    );
  });

  // grouped notes enter this component ordered chronologically -- we want reverse chronological
  const reversed = sections.reverse();

  return <>{reversed}</>;
};

export default List;
