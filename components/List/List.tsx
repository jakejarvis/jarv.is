import classNames from "classnames";
import type { ReactNode } from "react";

import styles from "./List.module.css";

type Props = {
  children: ReactNode;
  className?: string;
};

export const UnorderedList = ({ children, className, ...rest }: Props) => (
  <ul className={classNames(styles.unordered, className)} {...rest}>
    {children}
  </ul>
);
export const OrderedList = ({ children, className, ...rest }: Props) => (
  <ol className={classNames(styles.ordered, className)} {...rest}>
    {children}
  </ol>
);

// TODO: this is based on good faith that the children are all `<li>`s...
export const ListItem = ({ children, className, ...rest }: Props) => (
  <li className={classNames(styles.item, className)} {...rest}>
    {children}
  </li>
);
