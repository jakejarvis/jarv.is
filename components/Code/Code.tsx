import clsx from "clsx";
import type { ComponentPropsWithoutRef } from "react";

import styles from "./Code.module.css";

const Code = ({ className, ...rest }: ComponentPropsWithoutRef<"code">) => (
  <code className={clsx(styles.code, className)} {...rest} />
);

export default Code;
