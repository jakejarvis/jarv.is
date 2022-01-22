import classNames from "classnames";
import type { HTMLAttributes } from "react";

import styles from "./Heading.module.css";

type Props = HTMLAttributes<HTMLHeadingElement> & {
  as?: "h1" | "h2" | "h3" | "h4" | "h5" | "h6";
  className?: string;
};

const Heading = ({ as: Component, className, ...rest }: Props) => {
  return <Component className={classNames(styles.heading, styles[Component], className)} {...rest} />;
};

export const H1 = (props: Props) => <Heading as="h1" {...props} />;
export const H2 = (props: Props) => <Heading as="h2" {...props} />;
export const H3 = (props: Props) => <Heading as="h3" {...props} />;
export const H4 = (props: Props) => <Heading as="h4" {...props} />;
export const H5 = (props: Props) => <Heading as="h5" {...props} />;
export const H6 = (props: Props) => <Heading as="h6" {...props} />;

export default Heading;
