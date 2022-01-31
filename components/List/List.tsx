import classNames from "classnames";
import type { HTMLAttributes } from "react";

import styles from "./List.module.css";

export const UnorderedList = ({ className, ...rest }: HTMLAttributes<HTMLUListElement>) => (
  <ul className={classNames(styles.unordered, className)} {...rest} />
);
export const OrderedList = ({ className, ...rest }: HTMLAttributes<HTMLOListElement>) => (
  <ol className={classNames(styles.ordered, className)} {...rest} />
);

// TODO: this is based on good faith that the children are all `<li>`s...
export const ListItem = ({ className, ...rest }: HTMLAttributes<HTMLLIElement>) => (
  <li className={classNames(styles.item, className)} {...rest} />
);
