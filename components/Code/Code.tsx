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
  "data-language": dataLanguage, // eslint-disable-line @typescript-eslint/no-unused-vars
  "data-theme": dataTheme,
  className,
  children,
  ...rest
}: CodeProps) => {
  return (
    <>
      {
        // detect if this input has been touched by shiki via rehype-pretty-code and if so, include a copy-to-clipboard
        // button as its sibling.
        dataTheme && <CopyButton className={styles.copyButton} source={children} />
      }
      <code className={clsx(styles.code, className)} {...rest}>
        {children}
      </code>
    </>
  );
};

export default Code;
