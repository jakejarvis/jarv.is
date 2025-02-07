import clsx from "clsx";
import type { ComponentPropsWithoutRef } from "react";

import styles from "./HorizontalRule.module.css";

const HorizontalRule = ({ className, ...rest }: ComponentPropsWithoutRef<"hr">) => (
  <hr className={clsx(styles.hr, className)} {...rest} />
);

export default HorizontalRule;
