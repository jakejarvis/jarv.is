import clsx from "clsx";
import type { ComponentPropsWithoutRef } from "react";

import styles from "./CodeInline.module.css";

export type CodeInlineProps = ComponentPropsWithoutRef<"code">;

const CodeInline = ({ className, ...rest }: CodeInlineProps) => (
  <code className={clsx(styles.codeInline, className)} {...rest} />
);

export default CodeInline;
