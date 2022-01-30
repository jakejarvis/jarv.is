import classNames from "classnames";
import type { PropsWithChildren } from "react";

import styles from "./Content.module.css";

type Props = PropsWithChildren<{
  className?: string;
}>;

const Content = ({ className, ...rest }: Props) => <div className={classNames(styles.content, className)} {...rest} />;

export default Content;
