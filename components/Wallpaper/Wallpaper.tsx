import { useEffect, useRef } from "react";
import classNames from "classnames/bind";
import type { PropsWithChildren } from "react";

import styles from "./Wallpaper.module.css";
const cx = classNames.bind(styles);

type Props = PropsWithChildren<{
  image: string;
  tile?: boolean;
  className?: string;
}>;

const Wallpaper = ({ image, tile, className, ...rest }: Props) => {
  const bgRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    bgRef.current.style.backgroundImage = `url(${image})`;
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  return <div ref={bgRef} className={cx(styles.wallpaper, { tile: !!tile }, className)} {...rest} />;
};

export default Wallpaper;
