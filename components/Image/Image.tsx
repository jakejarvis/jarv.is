import NextImage from "next/image";
import type { ImageProps as NextImageProps } from "next/image";

import styles from "./Image.module.css";

const Image = ({ src, width, height, alt, quality, priority }: NextImageProps) => {
  return (
    <div className={styles.wrapper}>
      <NextImage
        src={(src as string).replace(/^\/public/g, "")}
        layout="intrinsic"
        width={width}
        height={height}
        alt={alt || ""}
        quality={quality || 65}
        loading={priority ? "eager" : "lazy"}
        priority={!!priority}
      />
    </div>
  );
};

export default Image;
