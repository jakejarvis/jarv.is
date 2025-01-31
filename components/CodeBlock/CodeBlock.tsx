import clsx from "clsx";
import Code from "../Code";
import CopyButton from "../CopyButton";
import type { ComponentPropsWithoutRef } from "react";

import styles from "./CodeBlock.module.css";

export type CodeBlockProps = ComponentPropsWithoutRef<"div"> & {
  highlight?: boolean;
  withCopyButton?: boolean;
};

const CodeBlock = ({ highlight, withCopyButton, children, ...rest }: CodeBlockProps) => {
  return (
    <div className={clsx(styles.codeBlock, highlight && styles.highlight)}>
      {withCopyButton && <CopyButton className={styles.cornerCopyButton} source={children} />}
      <Code {...rest}>{children}</Code>
    </div>
  );
};

export default CodeBlock;
