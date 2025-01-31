import clsx from "clsx";
import type { ComponentPropsWithoutRef } from "react";

import styles from "./Terminal.module.css";

export type TerminalProps = ComponentPropsWithoutRef<"div">;

// a DOS-style terminal box with dynamic text
const Terminal = ({ className, children: message, ...rest }: TerminalProps) => {
  return (
    <div className={clsx(styles.blackBox, className)} {...rest}>
      {message && <pre className={styles.monospace}>{message}</pre>}
      <span className={styles.underscore} />
    </div>
  );
};

export default Terminal;
