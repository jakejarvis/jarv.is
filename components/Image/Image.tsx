import NextImage from "next/image";
import clsx from "clsx";
import type { ComponentPropsWithoutRef } from "react";
import type { StaticImageData } from "next/image";

import styles from "./Image.module.css";

const MAX_WIDTH = 865;

export type ImageProps = ComponentPropsWithoutRef<typeof NextImage>;

const Image = ({ src, height, width, quality, placeholder, className, ...rest }: ImageProps) => {
  const constrainWidth = (width?: number | `${number}`) => {
    if (!width) return MAX_WIDTH;

    return Math.min(typeof width === "string" ? parseInt(width, 10) : width, MAX_WIDTH);
  };

  const imageProps: ImageProps = {
    src,
    height,
    width: constrainWidth(width || (src as StaticImageData).width),
    quality: quality || 75,
    placeholder: placeholder || (typeof src === "string" ? "empty" : "blur"),
    ...rest,
  };

  return <NextImage className={clsx(styles.image, className)} {...imageProps} />;
};

export default Image;
