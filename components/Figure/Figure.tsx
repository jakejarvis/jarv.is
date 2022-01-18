import Image from "../Image/Image";
import innerText from "react-innertext";
import type { ReactNode } from "react";
import type { ImageProps as NextImageProps } from "next/image";

import styles from "./Figure.module.css";

type Props = Omit<NextImageProps, "alt"> & {
  children: ReactNode; // caption (can be in markdown, yay!!!)
  alt?: string; // becomes optional -- pulled from plaintext-ified caption if missing
};

const Figure = ({ children, alt, ...imageProps }: Props) => {
  return (
    <figure className={styles.figure}>
      <Image alt={alt || innerText(children)} {...imageProps} />
      <figcaption className={styles.caption}>{children}</figcaption>
    </figure>
  );
};

export default Figure;
