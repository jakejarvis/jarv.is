import classNames from "classnames";
import type { HTMLAttributes } from "react";

import styles from "./Content.module.css";

type Props = HTMLAttributes<HTMLDivElement>;

const Content = ({ className, ...rest }: Props) => <div className={classNames(styles.content, className)} {...rest} />;

export default Content;
