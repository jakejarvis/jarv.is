import { useEffect, useRef } from "react";
import classNames from "classnames";

import styles from "./Wallpaper.module.css";

export type WallpaperProps = JSX.IntrinsicElements["main"] & {
  image: string;
  tile?: boolean;
};

const Wallpaper = ({ image, tile, className, ...rest }: WallpaperProps) => {
  const bgRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    bgRef.current.style.backgroundImage = `url(${image})`;
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  return <main ref={bgRef} className={classNames(styles.wallpaper, tile && styles.tile, className)} {...rest} />;
};

export default Wallpaper;
