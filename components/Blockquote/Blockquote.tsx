import classNames from "classnames";

import styles from "./Blockquote.module.css";

export type BlockquoteProps = JSX.IntrinsicElements["blockquote"];

const Blockquote = ({ className, ...rest }: BlockquoteProps) => (
  <blockquote className={classNames(styles.blockquote, className)} {...rest} />
);

export default Blockquote;
