import CopyButton from "../CopyButton/CopyButton";
import type { ReactNode } from "react";

import styles from "./CodeBlock.module.css";

type Props = {
  className?: string;
  children: ReactNode;
};

const CodeBlock = (props: Props) => {
  if (props.className?.split(" ").includes("code-highlight")) {
    // full multi-line code blocks with prism highlighting and copy-to-clipboard button
    return (
      <div className={styles.block}>
        <CopyButton source={props.children} />
        <code {...props} className={`${styles.code} ${props.className}`}>
          {props.children}
        </code>
      </div>
    );
  } else {
    // inline code in paragraphs, headings, etc. (not highlighted)
    return <code className={`${styles.code} ${styles.inline}`}>{props.children}</code>;
  }
};

export default CodeBlock;
