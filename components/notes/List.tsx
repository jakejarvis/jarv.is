import ListItem from "./ListItem";

import styles from "./List.module.scss";

export default function List({ allNotes }) {
  const sections = [];

  Object.entries(allNotes).forEach(([year, notes]: [string, any]) => {
    sections.push(
      <section key={year} className={styles.section}>
        <h2 className={styles.year}>{year}</h2>
        <ul className={styles.list}>
          {notes.map((note) => (
            <ListItem key={note.slug} title={note.title} date={note.date} slug={note.slug} />
          ))}
        </ul>
      </section>
    );
  });

  return <>{sections.reverse()}</>;
}
