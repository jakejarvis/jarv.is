import { forwardRef } from "react";
import classNames from "classnames";
import type { Ref } from "react";

import styles from "./Terminal.module.css";

export type TerminalProps = JSX.IntrinsicElements["div"];

// a DOS-style terminal box with dynamic text
const Terminal = forwardRef(function Terminal({ className, ...rest }: TerminalProps, ref: Ref<HTMLSpanElement>) {
  return (
    <div className={classNames("monospace", className, styles.terminal)} {...rest}>
      <span ref={ref} /> <span className={styles.blink} />
    </div>
  );
});

export default Terminal;
