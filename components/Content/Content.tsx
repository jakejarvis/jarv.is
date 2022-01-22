import classNames from "classnames";
import type { ReactNode } from "react";

import styles from "./Content.module.css";

type Props = {
  children: ReactNode;
  className?: string;
};

const Content = ({ className, ...rest }: Props) => <div className={classNames(styles.content, className)} {...rest} />;

export default Content;
