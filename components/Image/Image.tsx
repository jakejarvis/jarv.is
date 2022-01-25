import NextImage from "next/image";
import classNames from "classnames";
import type { ImageProps as NextImageProps } from "next/image";

import styles from "./Image.module.css";

const CustomImage = ({
  src,
  width,
  height,
  placeholder,
  alt,
  layout,
  quality,
  priority,
  className,
  ...rest
}: NextImageProps) => {
  // passed directly into next/image: https://nextjs.org/docs/api-reference/next/image
  const imageProps: Partial<NextImageProps> = {
    width: typeof width === "string" ? Number.parseInt(width) : width,
    height: typeof height === "string" ? Number.parseInt(height) : height,
    alt: alt || "",
    layout: layout || "intrinsic",
    quality: quality || 65,
    priority: !!priority,
    loading: priority ? "eager" : "lazy",
  };

  if (typeof src === "object") {
    // static image imports: extract variables from the src object
    const staticImg = src as StaticImageData;

    imageProps.src = staticImg;
    // default to blur placeholder while loading
    imageProps.placeholder = placeholder || (staticImg.blurDataURL ? "blur" : "empty");
  } else {
    // regular path to jpg/png/etc. passed in, which makes explicit width and height required
    imageProps.src = (src as string).replace(/^\/public/g, "");
  }

  return (
    <div className={classNames(styles.wrapper, className)}>
      {/* @ts-ignore */}
      <NextImage {...imageProps} {...rest} />
    </div>
  );
};

export default CustomImage;
