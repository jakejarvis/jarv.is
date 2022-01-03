import Link from "next/link";
import { format } from "date-fns";
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

const Meta = ({ title, date, slug, tags = [] }: Props) => (
  <>
    <div className={styles.meta}>
      <div className={styles.date}>
        <span>
          <DateIcon className={`icon ${styles.icon}`} />
        </span>
        <span title={format(new Date(date), "PPppp")}>
          <Link href={`/notes/${slug}/`}>{format(new Date(date), "MMMM d, yyyy")}</Link>
        </span>
      </div>
      {tags.length > 0 && (
        <div className={styles.tags}>
          <span>
            <TagIcon className={`icon ${styles.icon}`} />
          </span>
          {tags.map((tag) => (
            <span key={tag} className={styles.tag}>
              {tag}
            </span>
          ))}
        </div>
      )}
      <div>
        <span>
          <EditIcon className={`icon ${styles.icon}`} />
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
        <span>
          <ViewsIcon className={`icon ${styles.icon}`} />
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

export default Meta;
