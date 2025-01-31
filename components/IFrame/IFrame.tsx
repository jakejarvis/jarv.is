import clsx from "clsx";
import type { ComponentPropsWithoutRef } from "react";

import styles from "./IFrame.module.css";

export type IFrameProps = ComponentPropsWithoutRef<"iframe"> & {
  src: string;
  height: number;
  width?: number; // defaults to 100%
  allowScripts?: boolean;
  noScroll?: boolean;
};

const IFrame = ({ src, title, height, width, allowScripts, noScroll, className, style, ...rest }: IFrameProps) => {
  return (
    <iframe
      src={src}
      title={title}
      sandbox={allowScripts ? "allow-same-origin allow-scripts allow-popups" : undefined}
      scrolling={noScroll ? "no" : undefined}
      loading="lazy"
      className={clsx(styles.iframe, className)}
      style={{
        height: `${height}px`,
        maxWidth: width ? `${width}px` : "100%",
        ...style,
      }}
      {...rest}
    />
  );
};

export default IFrame;
