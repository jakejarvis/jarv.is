import classNames from "classnames";
import type { HTMLAttributes } from "react";

import styles from "./Heading.module.css";

type Props = HTMLAttributes<HTMLHeadingElement> & {
  as?: "h1" | "h2" | "h3" | "h4" | "h5" | "h6";
};

const Heading = ({ as: Component, children, ...rest }: Props) => {
  return (
    <Component className={classNames(styles.heading, styles[Component])} {...rest}>
      {children}
    </Component>
  );
};

// TODO: do this less manually...
export const H1 = ({ children, ...props }: Props) => (
  <Heading as="h1" {...props}>
    {children}
  </Heading>
);
export const H2 = ({ children, ...props }: Props) => (
  <Heading as="h2" {...props}>
    {children}
  </Heading>
);
export const H3 = ({ children, ...props }: Props) => (
  <Heading as="h3" {...props}>
    {children}
  </Heading>
);
export const H4 = ({ children, ...props }: Props) => (
  <Heading as="h4" {...props}>
    {children}
  </Heading>
);
export const H5 = ({ children, ...props }: Props) => (
  <Heading as="h5" {...props}>
    {children}
  </Heading>
);
export const H6 = ({ children, ...props }: Props) => (
  <Heading as="h6" {...props}>
    {children}
  </Heading>
);

export default Heading;
