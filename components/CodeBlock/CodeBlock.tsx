import clsx from "clsx";
import CopyButton from "../CopyButton";
import type { ComponentPropsWithoutRef } from "react";

import styles from "./CodeBlock.module.css";

export type CodeBlockProps = ComponentPropsWithoutRef<"div"> & {
  highlight?: boolean;
  withCopyButton?: boolean;
};

const CodeBlock = ({ highlight, withCopyButton, className, children, ...rest }: CodeBlockProps) => {
  return (
    <div className={clsx(styles.codeBlock, highlight && styles.highlight)}>
      {withCopyButton && <CopyButton className={styles.cornerCopyButton} source={children} />}
      <code className={clsx(styles.code, className)} {...rest}>
        {children}
      </code>
    </div>
  );
};

export default CodeBlock;
