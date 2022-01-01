import Link from "next/link";
import { format, parseISO } from "date-fns";

import styles from "./List.module.scss";

type NoteProps = {
  title: string;
  date: string;
  slug: string;
};

export default function List({ notesByYear }) {
  const sections = [];

  Object.entries(notesByYear).forEach(([year, notes]: [string, NoteProps[]]) => {
    sections.push(
      <section key={year} className={styles.section}>
        <h2 className={styles.year}>{year}</h2>
        <ul className={styles.list}>
          {notes.map((note) => (
            <li key={note.slug} className={styles.row}>
              <span className={styles.date}>{format(parseISO(note.date), "MMM d")}</span>
              <span>
                <Link href={`/notes/${note.slug}/`} prefetch={false}>
                  <a>{note.title}</a>
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
}
