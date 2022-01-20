import type { ReactNode } from "react";

import styles from "./List.module.css";

type Props = {
  children: ReactNode;
};

export const UnorderedList = ({ children, ...rest }: Props) => (
  <ul className={styles.unordered} {...rest}>
    {children}
  </ul>
);
export const OrderedList = ({ children, ...rest }: Props) => (
  <ol className={styles.ordered} {...rest}>
    {children}
  </ol>
);

// TODO: this is based on good faith that the children are all `<li>`s...
export const ListItem = ({ children, ...rest }: Props) => (
  <li className={styles.item} {...rest}>
    {children}
  </li>
);
