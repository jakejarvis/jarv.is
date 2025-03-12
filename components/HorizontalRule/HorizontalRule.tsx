import clsx from "clsx";
import type { ComponentPropsWithoutRef } from "react";

import styles from "./HorizontalRule.module.css";

export type HorizontalRuleProps = ComponentPropsWithoutRef<"hr">;

const HorizontalRule = ({ className, ...rest }: HorizontalRuleProps) => (
  <hr className={clsx(styles.hr, className)} {...rest} />
);

export default HorizontalRule;
