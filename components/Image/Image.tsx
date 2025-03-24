import NextImage from "next/image";
import clsx from "clsx";
import { MAX_WIDTH } from "../../lib/config/constants";
import type { ComponentPropsWithoutRef } from "react";
import type { StaticImageData } from "next/image";

import styles from "./Image.module.css";

export type ImageProps = ComponentPropsWithoutRef<typeof NextImage>;

const Image = ({ src, height, width, placeholder, className, ...rest }: ImageProps) => {
  const constrainWidth = (width?: number | `${number}`) => {
    if (!width) return MAX_WIDTH;

    // ensure that the image width is not greater than the global maximum width
    return Math.min(typeof width === "string" ? parseInt(width, 10) : width, MAX_WIDTH);
  };

  const imageProps: ImageProps = {
    src,
    height,
    width: constrainWidth(width || (src as StaticImageData).width),
    placeholder: placeholder || (typeof src === "object" && "blurDataURL" in src ? "blur" : "empty"),
    ...rest,
  };

  return <NextImage className={clsx(styles.image, className)} {...imageProps} />;
};

export default Image;
