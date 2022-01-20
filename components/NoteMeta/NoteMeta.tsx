import Link from "next/link";
import classNames from "classnames";
import { format } from "date-fns";
import HitCounter from "../HitCounter/HitCounter";
import { DateIcon, TagIcon, EditIcon, ViewsIcon } from "../Icons";
import * as config from "../../lib/config";
import type { NoteMetaType } from "../../types";

import styles from "./NoteMeta.module.css";

type Props = Pick<NoteMetaType, "slug" | "date" | "title" | "tags">;

const NoteMeta = ({ slug, date, title, tags = [] }: Props) => (
  <div className={styles.meta}>
    <div className={styles.date}>
      <span>
        <DateIcon className={classNames("icon", styles.icon)} />
      </span>
      <span title={format(new Date(date), "PPppp")}>
        <Link href={`/notes/${slug}/`}>
          <a>{format(new Date(date), "MMMM d, yyyy")}</a>
        </Link>
      </span>
    </div>

    {tags.length > 0 && (
      <div className={styles.tags}>
        <span>
          <TagIcon className={classNames("icon", styles.icon)} />
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
        <EditIcon className={classNames("icon", styles.icon)} />
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
        <ViewsIcon className={classNames("icon", styles.icon)} />
      </span>
      <HitCounter slug={`notes/${slug}`} />
    </div>
  </div>
);

export default NoteMeta;
