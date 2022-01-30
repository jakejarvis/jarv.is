import { format } from "date-fns";
import Link from "../Link/Link";
import type { NoteMetaType } from "../../types";

import styles from "./NotesList.module.css";

const NotesList = ({ notesByYear }) => {
  const sections = [];

  Object.entries(notesByYear).forEach(([year, notes]: [string, NoteMetaType[]]) => {
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
                    query: { slug: slug },
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
