import classNames from "classnames";
import type { HTMLAttributes } from "react";

import styles from "./Blockquote.module.css";

type Props = HTMLAttributes<HTMLElement>;

const Blockquote = ({ className, ...rest }: Props) => (
  <blockquote className={classNames(styles.blockquote, className)} {...rest} />
);

export default Blockquote;
