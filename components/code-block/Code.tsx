import CopyButton from "./CopyButton";
import type { ReactNode } from "react";

import styles from "./Code.module.css";

export type CustomCodeProps = {
  className?: string;
  children: ReactNode;
};

const CustomCode = (props: CustomCodeProps) => {
  if (props.className?.split(" ").includes("code-highlight")) {
    // full multi-line code blocks with prism highlighting and copy-to-clipboard button
    return (
      <>
        <div className={styles.code_block}>
          <CopyButton source={props.children} />
          <code {...props}>{props.children}</code>
        </div>
      </>
    );
  } else {
    // inline code in paragraphs, headings, etc. (not highlighted)
    return <code {...props}>{props.children}</code>;
  }
};

export default CustomCode;
