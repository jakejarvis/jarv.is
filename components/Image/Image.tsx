import NextImage from "next/image";
import clsx from "clsx";
import type { ComponentPropsWithoutRef } from "react";
import type { StaticImageData } from "next/image";

import styles from "./Image.module.css";

const MAX_WIDTH = 865;

export type ImageProps = ComponentPropsWithoutRef<typeof NextImage> & {
  inline?: boolean; // don't wrap everything in a `<div>` block
};

const Image = ({ src, height, width, quality, inline, className, ...rest }: ImageProps) => {
  const constrainWidth = (width?: number | `${number}`) => {
    if (!width) return MAX_WIDTH;

    return Math.min(typeof width === "string" ? parseInt(width, 10) : width, MAX_WIDTH);
  };

  const imageProps = {
    src,
    height,
    width: constrainWidth(width || (src as StaticImageData).width),
    quality: quality || 75,
    ...rest,
  };

  const StyledImageWithProps = <NextImage className={clsx(styles.image, className)} {...imageProps} />;

  return inline ? StyledImageWithProps : <div className={styles.block}>{StyledImageWithProps}</div>;
};

export default Image;
