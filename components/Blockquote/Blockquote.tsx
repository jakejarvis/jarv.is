import clsx from "clsx";
import type { ComponentPropsWithoutRef } from "react";

import styles from "./Blockquote.module.css";

const Blockquote = ({ className, ...rest }: ComponentPropsWithoutRef<"blockquote">) => (
  <blockquote className={clsx(styles.blockquote, className)} {...rest} />
);

export default Blockquote;
