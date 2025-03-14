import NextImage from "next/image";
import { MAX_WIDTH } from "../../lib/config/constants";
import type { ComponentPropsWithoutRef } from "react";
import type { StaticImageData } from "next/image";

export type ImageProps = ComponentPropsWithoutRef<typeof NextImage>;

const Image = ({ src, height, width, quality, placeholder, style, ...rest }: ImageProps) => {
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
    style: {
      height: "auto",
      ...style,
    },
    ...rest,
  };

  return <NextImage {...imageProps} />;
};

export default Image;
