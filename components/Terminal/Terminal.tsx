import { forwardRef } from "react";
import classNames from "classnames";
import type { Ref, HTMLAttributes } from "react";

import styles from "./Terminal.module.css";

type Props = HTMLAttributes<HTMLDivElement>;

// a DOS-style terminal box with dynamic text
const Terminal = forwardRef(function Terminal({ className, ...rest }: Props, ref: Ref<HTMLSpanElement>) {
  return (
    <div className={classNames("monospace", className, styles.terminal)} {...rest}>
      <span ref={ref} /> <span className={styles.blink} />
    </div>
  );
});

export default Terminal;
