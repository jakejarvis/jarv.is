import Link from "next/link";
import classNames from "classnames";
import type { NoteMetaType } from "../../types";

import styles from "./NoteTitle.module.css";

export type NoteTitleProps = Pick<NoteMetaType, "slug" | "htmlTitle"> & JSX.IntrinsicElements["h1"];

const NoteTitle = ({ slug, htmlTitle, className, ...rest }: NoteTitleProps) => (
  <h1 className={classNames(styles.title, className)} {...rest}>
    <Link
      href={{
        pathname: "/notes/[slug]/",
        query: { slug: slug },
      }}
    >
      <a className={styles.link} dangerouslySetInnerHTML={{ __html: htmlTitle }} />
    </Link>
  </h1>
);

export default NoteTitle;
