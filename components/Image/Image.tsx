import NextImage from "next/image";
import clsx from "clsx";
import Link from "../Link";
import type { ComponentPropsWithoutRef } from "react";
import type { ImageProps as NextImageProps, StaticImageData } from "next/image";

import styles from "./Image.module.css";

const DEFAULT_QUALITY = 60;
const DEFAULT_WIDTH = 865;

export type ImageProps = ComponentPropsWithoutRef<typeof NextImage> & {
  href?: string; // optionally wrap image in a link
  inline?: boolean; // don't wrap everything in a `<div>` block
};

const Image = ({
  src,
  width,
  height,
  quality = DEFAULT_QUALITY,
  placeholder,
  href,
  inline,
  className,
  ...rest
}: ImageProps) => {
  const imageProps: NextImageProps = {
    // strip "px" from dimensions: https://stackoverflow.com/a/4860249/1438024
    width: typeof width === "string" ? Number.parseInt(width, 10) : width,
    height: typeof height === "string" ? Number.parseInt(height, 10) : height,
    quality,
    src,
    placeholder,
    ...rest,
  };

  if (typeof src === "object" && (src as StaticImageData).src !== undefined) {
    const staticImg = src as StaticImageData;

    // all data for statically imported images is extracted from the object itself.
    imageProps.src = staticImg;
    // set image width to max layout width; height is calculated automatically via aspect ratio:
    // https://github.com/vercel/next.js/pull/40278
    imageProps.width = staticImg.width > DEFAULT_WIDTH ? DEFAULT_WIDTH : imageProps.width;
    // default to blur placeholder while loading if it's been generated for us.
    imageProps.placeholder = placeholder || (staticImg.blurDataURL !== undefined ? "blur" : "empty");
  } else if (typeof src === "string") {
    // regular path to a file was passed in, which makes explicit width and height required.
    // https://nextjs.org/docs/api-reference/next/future/image#width
    if (!(width && height)) {
      throw new Error("'width' and 'height' are required for non-statically imported images.");
    }

    // optionally prepending src with "/public" makes images resolve properly in GitHub markdown previews, etc.
    imageProps.src = src.replace(/^\/public/g, "");
  } else {
    throw new TypeError("'src' should be a string or a valid StaticImageData object.");
  }

  const StyledImageWithProps = href ? (
    <Link href={href} underline={false}>
      <NextImage className={clsx(styles.image, className)} {...imageProps} />
    </Link>
  ) : (
    <NextImage className={clsx(styles.image, className)} {...imageProps} />
  );

  return inline ? StyledImageWithProps : <div className={styles.block}>{StyledImageWithProps}</div>;
};

export default Image;
