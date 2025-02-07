import clsx from "clsx";
import type { ComponentPropsWithoutRef } from "react";

import styles from "./Content.module.css";

const Content = ({ className, ...rest }: ComponentPropsWithoutRef<"div">) => (
  <div className={clsx(styles.content, className)} {...rest} />
);

export default Content;
