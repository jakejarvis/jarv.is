import clsx from "clsx";
import type { ComponentPropsWithoutRef } from "react";

import styles from "./Video.module.css";

export type VideoProps = Omit<Partial<ComponentPropsWithoutRef<"video">>, "src"> & {
  src: {
    // at least one is required:
    webm?: string;
    mp4?: string;
    // optional:
    vtt?: string;
  };
  poster?: string;
  autoplay?: boolean;
  responsive?: boolean;
  className?: string;
};

const Video = ({ src, poster, autoplay = false, responsive = true, className, ...rest }: VideoProps) => {
  if (!src || (!src.mp4 && !src.webm)) {
    throw new Error("'src' prop must include either 'mp4' or 'webm' URL.");
  }

  return (
    <div className={clsx(styles.wrapper, responsive && styles.responsive, className)}>
      <video
        width="100%"
        height="100%"
        className={styles.player}
        preload={autoplay ? "auto" : "metadata"}
        controls={!autoplay}
        autoPlay={autoplay || undefined}
        playsInline={autoplay} // safari autoplay workaround
        loop={autoplay || undefined}
        muted={autoplay || undefined}
        poster={poster}
        {...rest}
      >
        {src.webm && <source key={src.webm} src={src.webm} type="video/webm" />}
        {src.mp4 && <source key={src.mp4} src={src.mp4} type="video/mp4" />}
        {src.vtt && <track key={src.vtt} kind="subtitles" src={src.vtt} srcLang="en" label="English" default />}
      </video>
    </div>
  );
};

export default Video;
