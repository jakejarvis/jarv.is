import { format } from "date-fns";
import Link from "../Link/Link";
import type { NoteType } from "../../types";

import styles from "./NotesList.module.css";

export type NotesListProps = {
  notesByYear: Record<string, NoteType["frontMatter"][]>;
};

const NotesList = ({ notesByYear }: NotesListProps) => {
  const sections = [];

  Object.entries(notesByYear).forEach(([year, notes]: [string, NoteType["frontMatter"][]]) => {
    sections.push(
      <section key={year} className={styles.section}>
        <h2 className={styles.year}>{year}</h2>
        <ul className={styles.list}>
          {notes.map(({ slug, date, htmlTitle }) => (
            <li key={slug} className={styles.row}>
              <span className={styles.date}>{format(new Date(date), "MMM d")}</span>
              <span>
                <Link
                  href={{
                    pathname: "/notes/[slug]/",
                    query: { slug },
                  }}
                  dangerouslySetInnerHTML={{ __html: htmlTitle }}
                />
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

export default NotesList;
