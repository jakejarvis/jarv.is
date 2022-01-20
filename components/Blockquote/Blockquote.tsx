import classNames from "classnames";
import type { BlockquoteHTMLAttributes } from "react";

import styles from "./Blockquote.module.css";

type Props = BlockquoteHTMLAttributes<HTMLElement>;

const Blockquote = ({ children, className, ...rest }: Props) => (
  <blockquote className={classNames(styles.blockquote, className)} {...rest}>
    {children}
  </blockquote>
);

export default Blockquote;
