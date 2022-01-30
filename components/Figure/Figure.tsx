import Image from "../Image/Image";
import innerText from "react-innertext";
import classNames from "classnames";
import type { PropsWithChildren } from "react";
import type { ImageProps as NextImageProps } from "next/image";

import styles from "./Figure.module.css";

type Props = Omit<NextImageProps, "alt"> &
  PropsWithChildren<{
    alt?: string; // becomes optional -- pulled from plaintext-ified caption if missing
    className?: string;
  }>;

const Figure = ({ children, alt, className, ...imageProps }: Props) => {
  return (
    <figure className={classNames(styles.figure, className)}>
      <Image alt={alt || innerText(children)} {...imageProps} />
      <figcaption className={styles.caption}>{children}</figcaption>
    </figure>
  );
};

export default Figure;
