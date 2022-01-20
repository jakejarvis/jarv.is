import NextImage from "next/image";
import classNames from "classnames";
import type { ImageProps as NextImageProps } from "next/image";

import styles from "./Image.module.css";

const Image = ({ src, width, height, alt, quality, priority, className, ...rest }: NextImageProps) => {
  return (
    <div className={classNames(styles.wrapper, className)}>
      <NextImage
        src={(src as string).replace(/^\/public/g, "")}
        layout="intrinsic"
        width={width}
        height={height}
        alt={alt || ""}
        quality={quality || 65}
        loading={priority ? "eager" : "lazy"}
        priority={!!priority}
        {...rest}
      />
    </div>
  );
};

export default Image;
