import Link from "next/link";
import { format, parseISO } from "date-fns";

import styles from "./ListItem.module.scss";

export type Props = {
  title: string;
  date: string;
  slug: string;
};

export default function ListItem({ title, date, slug }: Props) {
  return (
    <li className={styles.row}>
      <span className={styles.date}>{format(parseISO(date), "MMM d")}</span>
      <span>
        <Link href={`/notes/${slug}/`} prefetch={false}>
          <a>{title}</a>
        </Link>
      </span>
    </li>
  );
}
