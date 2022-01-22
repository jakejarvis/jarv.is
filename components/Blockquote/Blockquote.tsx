import classNames from "classnames";
import type { BlockquoteHTMLAttributes } from "react";

import styles from "./Blockquote.module.css";

type Props = BlockquoteHTMLAttributes<HTMLElement>;

const Blockquote = ({ className, ...rest }: Props) => (
  <blockquote className={classNames(styles.blockquote, className)} {...rest} />
);

export default Blockquote;
