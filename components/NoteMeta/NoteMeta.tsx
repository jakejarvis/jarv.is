import classNames from "classnames";
import { format } from "date-fns";
import HitCounter from "../HitCounter/HitCounter";
import { DateIcon, TagIcon, EditIcon, ViewsIcon } from "../Icons";
import * as config from "../../lib/config";
import type { NoteMetaType } from "../../types";

import styles from "./NoteMeta.module.css";
import Link from "next/link";

type Props = Pick<NoteMetaType, "slug" | "date" | "title" | "tags">;

const NoteMeta = ({ slug, date, title, tags = [] }: Props) => (
  <div className={styles.meta}>
    <div className={styles.meta_item}>
      <Link
        href={{
          pathname: "/notes/[slug]/",
          query: { slug: slug },
        }}
      >
        <a className={styles.date_link}>
          <span>
            <DateIcon className={styles.icon} />
          </span>
          <span title={format(new Date(date), "PPppp")}>{format(new Date(date), "MMMM d, yyyy")}</span>
        </a>
      </Link>
    </div>

    {tags.length > 0 && (
      <div className={classNames(styles.meta_item, styles.tags)}>
        <span>
          <TagIcon className={styles.icon} />
        </span>
        {tags.map((tag) => (
          <span key={tag} className={styles.tag}>
            {tag}
          </span>
        ))}
      </div>
    )}

    <div className={styles.meta_item}>
      <a
        className={styles.edit_link}
        href={`https://github.com/${config.githubRepo}/blob/main/notes/${slug}.mdx`}
        target="_blank"
        rel="noopener noreferrer"
        title={`Edit "${title}" on GitHub`}
      >
        <span>
          <EditIcon className={styles.icon} />
        </span>
        <span>Improve This Post</span>
      </a>
    </div>

    <div className={classNames(styles.meta_item, styles.views)}>
      <span>
        <ViewsIcon className={styles.icon} />
      </span>
      <HitCounter slug={`notes/${slug}`} />
    </div>
  </div>
);

export default NoteMeta;
