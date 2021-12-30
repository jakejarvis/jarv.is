import Link from "next/link";
import { format, parseISO } from "date-fns";
import Hits from "../hits/Hits";
import { DateIcon, TagIcon, EditIcon, ViewsIcon } from "../icons";
import * as config from "../../lib/config";

import styles from "./Meta.module.scss";

export type Props = {
  title: string;
  date: string;
  slug: string;
  tags?: string[];
};

export default function Meta({ title, date, slug, tags = [] }: Props) {
  return (
    <>
      <div className={styles.meta}>
        <div className={styles.date}>
          <span className={styles.meta_icon}>
            <DateIcon className={`icon ${styles.icon_svg}`} />
          </span>
          <span title={format(parseISO(date), "PPppp")}>{format(parseISO(date), "MMMM d, yyyy")}</span>
        </div>
        {tags.length > 0 && (
          <div className={styles.tags}>
            <span className={styles.meta_icon}>
              <TagIcon className={`icon ${styles.icon_svg}`} />
            </span>
            {tags.map((tag) => (
              <span key={tag} className={styles.tag}>
                {tag}
              </span>
            ))}
          </div>
        )}
        <div>
          <span className={styles.meta_icon}>
            <EditIcon className={`icon ${styles.icon_svg}`} />
          </span>
          <span>
            <a
              href={`https://github.com/${config.githubRepo}/blob/main/notes/${slug}.mdx`}
              target="_blank"
              rel="noopener noreferrer"
              title={`Edit "${title}" on GitHub`}
            >
              Improve This Post
            </a>
          </span>
        </div>
        <div>
          <span className={styles.meta_icon}>
            <ViewsIcon className={`icon ${styles.icon_svg}`} />
          </span>
          <Hits slug={`notes/${slug}`} />
        </div>
      </div>

      <h1 className={styles.title}>
        <Link href={`/notes/${slug}/`}>
          <a>{title}</a>
        </Link>
      </h1>
    </>
  );
}
