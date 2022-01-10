import styles from "./Content.module.css";
import type { ReactNode } from "react";

type Props = {
  children: ReactNode;
};

const Content = ({ children }: Props) => <div className={styles.content}>{children}</div>;

export default Content;
