import Link from "next/link";
import type { NoteMetaType } from "../../types";

import styles from "./NoteTitle.module.css";

type Props = Pick<NoteMetaType, "slug" | "htmlTitle">;

const NoteTitle = ({ slug, htmlTitle, ...rest }: Props) => (
  <h1 className={styles.title}>
    <Link
      href={{
        pathname: "/notes/[slug]/",
        query: { slug: slug },
      }}
    >
      <a dangerouslySetInnerHTML={{ __html: htmlTitle }} {...rest} />
    </Link>
  </h1>
);

export default NoteTitle;
