import clsx from "clsx";
import type { ComponentPropsWithoutRef } from "react";

import styles from "./Blockquote.module.css";

export type BlockquoteProps = ComponentPropsWithoutRef<"blockquote">;

const Blockquote = ({ className, ...rest }: BlockquoteProps) => (
  <blockquote className={clsx(styles.blockquote, className)} {...rest} />
);

export default Blockquote;
