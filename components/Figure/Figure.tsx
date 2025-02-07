import innerText from "react-innertext";
import clsx from "clsx";
import Image from "../Image";
import type { PropsWithChildren, ComponentPropsWithoutRef } from "react";

import styles from "./Figure.module.css";

export type FigureProps = Omit<ComponentPropsWithoutRef<typeof Image>, "alt"> &
  PropsWithChildren<{
    alt?: string; // becomes optional -- pulled from plaintext-ified caption if missing
  }>;

const Figure = ({ children, alt, className, ...imageProps }: FigureProps) => {
  return (
    <figure className={clsx(styles.figure, className)}>
      <Image alt={alt || innerText(children)} {...imageProps} />
      <figcaption className={styles.caption}>{children}</figcaption>
    </figure>
  );
};

export default Figure;
