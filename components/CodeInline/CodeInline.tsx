import clsx from "clsx";
import type { ComponentPropsWithoutRef } from "react";

import styles from "./CodeInline.module.css";

const CodeInline = ({ className, ...rest }: ComponentPropsWithoutRef<"code">) => (
  <code className={clsx(styles.codeInline, className)} {...rest} />
);

export default CodeInline;
