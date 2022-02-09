import classNames from "classnames";

import styles from "./Content.module.css";

type ContentProps = JSX.IntrinsicElements["div"];

const Content = ({ className, ...rest }: ContentProps) => (
  <div className={classNames(styles.content, className)} {...rest} />
);

export default Content;
