import clsx from "clsx";
import type { ComponentPropsWithoutRef } from "react";

import styles from "./Video.module.css";

export type VideoProps = Omit<Partial<ComponentPropsWithoutRef<"video">>, "src"> & {
  src: string[];
  poster?: string;
  autoplay?: boolean;
};

const Video = ({ src, poster, autoplay = false, className, ...rest }: VideoProps) => {
  return (
    <video
      className={clsx(styles.player, className)}
      poster={poster}
      {...(autoplay
        ? {
            preload: "auto",
            controls: false,
            autoPlay: true,
            playsInline: true, // safari autoplay workaround
            loop: true,
            muted: true,
          }
        : {
            preload: "metadata",
            controls: true,
          })}
      {...rest}
    >
      {src.map((file) => {
        const extension = file.split(".").pop();

        if (extension === "vtt") {
          return <track key={file} kind="subtitles" src={file} srcLang="en" label="English" default />;
        } else {
          return <source key={file} src={file} type={`video/${extension}`} />;
        }
      })}
    </video>
  );
};

export default Video;
