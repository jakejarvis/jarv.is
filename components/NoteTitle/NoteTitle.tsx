import Link from "next/link";
import type { NoteMetaType } from "../../types";

import styles from "./NoteTitle.module.css";

type Props = Pick<NoteMetaType, "slug" | "htmlTitle">;

const NoteTitle = ({ slug, htmlTitle }: Props) => (
  <h1 className={styles.title}>
    <Link href={`/notes/${slug}/`}>
      <a dangerouslySetInnerHTML={{ __html: htmlTitle }} />
    </Link>
  </h1>
);

export default NoteTitle;
