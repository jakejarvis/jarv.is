import clsx from "clsx";
import Code from "../Code";
import type { ComponentPropsWithoutRef } from "react";

import styles from "./CodeInline.module.css";

const CodeInline = ({ className, ...rest }: ComponentPropsWithoutRef<typeof Code>) => (
  <Code className={clsx(styles.codeInline, className)} {...rest} />
);

export default CodeInline;
