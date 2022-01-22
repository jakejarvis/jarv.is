import type { ReactNode } from "react";

import styles from "./Content.module.css";

type Props = {
  children: ReactNode;
};

const Content = (props: Props) => <div className={styles.content} {...props} />;

export default Content;
