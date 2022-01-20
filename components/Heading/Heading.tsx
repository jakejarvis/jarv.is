import classNames from "classnames";
import type { HTMLAttributes } from "react";

import styles from "./Heading.module.css";

type Props = HTMLAttributes<HTMLHeadingElement> & {
  as?: "h1" | "h2" | "h3" | "h4" | "h5" | "h6";
  className?: string;
};

const Heading = ({ as: Component, children, className, ...rest }: Props) => {
  return (
    <Component className={classNames(styles.heading, styles[Component], className)} {...rest}>
      {children}
    </Component>
  );
};

// TODO: do this less manually...
export const H1 = ({ children, ...rest }: Props) => (
  <Heading as="h1" {...rest}>
    {children}
  </Heading>
);
export const H2 = ({ children, ...rest }: Props) => (
  <Heading as="h2" {...rest}>
    {children}
  </Heading>
);
export const H3 = ({ children, ...rest }: Props) => (
  <Heading as="h3" {...rest}>
    {children}
  </Heading>
);
export const H4 = ({ children, ...rest }: Props) => (
  <Heading as="h4" {...rest}>
    {children}
  </Heading>
);
export const H5 = ({ children, ...rest }: Props) => (
  <Heading as="h5" {...rest}>
    {children}
  </Heading>
);
export const H6 = ({ children, ...rest }: Props) => (
  <Heading as="h6" {...rest}>
    {children}
  </Heading>
);

export default Heading;
