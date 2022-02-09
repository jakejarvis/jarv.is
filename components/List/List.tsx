import classNames from "classnames";

import styles from "./List.module.css";

export const UnorderedList = ({ className, ...rest }: JSX.IntrinsicElements["ul"]) => (
  <ul className={classNames(styles.unordered, className)} {...rest} />
);
export const OrderedList = ({ className, ...rest }: JSX.IntrinsicElements["ol"]) => (
  <ol className={classNames(styles.ordered, className)} {...rest} />
);

// TODO: this is based on good faith that the children are all `<li>`s...
export const ListItem = ({ className, ...rest }: JSX.IntrinsicElements["li"]) => (
  <li className={classNames(styles.item, className)} {...rest} />
);
