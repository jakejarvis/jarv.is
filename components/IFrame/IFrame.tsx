import classNames from "classnames";

import styles from "./IFrame.module.css";

type Props = {
  src: string;
  title?: string;
  height: number;
  width?: number; // defaults to 100%
  allowScripts?: boolean;
  noScroll?: boolean;
  className?: string;
};

const IFrame = ({ src, title, height, width, allowScripts, noScroll, className, ...rest }: Props) => (
  <iframe
    className={classNames(styles.frame, className)}
    src={src}
    title={title}
    sandbox={allowScripts ? "allow-same-origin allow-scripts allow-popups" : undefined}
    scrolling={noScroll ? "no" : undefined}
    loading="lazy"
    style={{
      height: `${height}px`,
      maxWidth: width ? `${width}px` : undefined,
    }}
    {...rest}
  />
);

export default IFrame;
