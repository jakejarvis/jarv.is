import clsx from "clsx";
import type { ComponentPropsWithoutRef } from "react";

import styles from "./List.module.css";

export const UnorderedList = ({ className, ...rest }: ComponentPropsWithoutRef<"ul">) => (
  <ul className={clsx(styles.list, className)} {...rest} />
);

export const OrderedList = ({ className, ...rest }: ComponentPropsWithoutRef<"ol">) => (
  <ol className={clsx(styles.list, className)} {...rest} />
);

export const ListItem = ({ className, ...rest }: ComponentPropsWithoutRef<"li">) => (
  <li className={clsx(styles.listItem, className)} {...rest} />
);

export default UnorderedList;
