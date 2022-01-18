import type { ReactNode } from "react";

import styles from "./Content.module.css";

type Props = {
  children: ReactNode;
};

const Content = ({ children }: Props) => <div className={styles.content}>{children}</div>;

export default Content;
