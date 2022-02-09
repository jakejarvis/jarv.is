import Link from "next/link";
import classNames from "classnames";
import type { NoteMetaType } from "../../types";

import styles from "./NoteTitle.module.css";

type NoteTitleProps = Pick<NoteMetaType, "slug" | "htmlTitle"> & JSX.IntrinsicElements["a"];

const NoteTitle = ({ slug, htmlTitle, className, ...rest }: NoteTitleProps) => (
  <h1 className={classNames(styles.title, className)}>
    <Link
      href={{
        pathname: "/notes/[slug]/",
        query: { slug: slug },
      }}
    >
      <a className={styles.link} dangerouslySetInnerHTML={{ __html: htmlTitle }} {...rest} />
    </Link>
  </h1>
);

export default NoteTitle;
