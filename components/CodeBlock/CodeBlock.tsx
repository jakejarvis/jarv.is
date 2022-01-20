import classNames from "classnames";
import CopyButton from "../CopyButton/CopyButton";
import type { ReactNode } from "react";

import styles from "./CodeBlock.module.css";

type Props = {
  children: ReactNode;
  className?: string;
};

const CodeBlock = ({ children, className, ...rest }: Props) => {
  if (className?.split(" ").includes("code-highlight")) {
    // full multi-line code blocks with prism highlighting and copy-to-clipboard button
    return (
      <div className={styles.block}>
        <CopyButton source={children} className={styles.copy_btn} />
        <code className={classNames(styles.code, className)} {...rest}>
          {children}
        </code>
      </div>
    );
  } else {
    // inline code in paragraphs, headings, etc. (not highlighted)
    return (
      <code className={classNames(styles.code, styles.inline, className)} {...rest}>
        {children}
      </code>
    );
  }
};

export default CodeBlock;
