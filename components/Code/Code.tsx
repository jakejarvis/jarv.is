import clsx from "clsx";
import CopyButton from "../CopyButton";
import type { ComponentPropsWithoutRef } from "react";

import styles from "./Code.module.css";

export type CodeProps = ComponentPropsWithoutRef<"code"> & {
  "data-language"?: string;
  "data-theme"?: string;
};

// a simple wrapper component that "intelligently" picks between inline code and code blocks (w/ optional syntax
// highlighting & a clipboard button)
const Code = ({
  "data-language": dataLanguage,
  "data-theme": dataTheme, // eslint-disable-line @typescript-eslint/no-unused-vars
  className,
  children,
  ...rest
}: CodeProps) => {
  // detect if this input has already been touched by shiki via rehype-pretty-code
  if (dataLanguage) {
    // full multi-line code blocks with copy-to-clipboard button
    return (
      <>
        <CopyButton className={styles.copyButton} source={children} />
        <code className={clsx(styles.highlighted, className)} {...rest}>
          {children}
        </code>
      </>
    );
  }

  // simple inline code in paragraphs, headings, etc. (never highlighted)
  return (
    <code className={clsx(styles.inline, className)} {...rest}>
      {children}
    </code>
  );
};

export default Code;
