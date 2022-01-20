import type { BlockquoteHTMLAttributes } from "react";

import styles from "./Blockquote.module.css";

type Props = BlockquoteHTMLAttributes<HTMLElement>;

const Blockquote = ({ children, ...rest }: Props) => (
  <blockquote className={styles.blockquote} {...rest}>
    {children}
  </blockquote>
);

export default Blockquote;
