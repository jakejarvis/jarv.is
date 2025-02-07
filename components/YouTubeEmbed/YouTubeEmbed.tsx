import clsx from "clsx";
import type { ComponentPropsWithoutRef } from "react";

import styles from "./YouTubeEmbed.module.css";

export type YouTubeEmbedProps = ComponentPropsWithoutRef<"div"> & {
  id: string;
};

const YouTubeEmbed = ({ id, className, ...rest }: YouTubeEmbedProps) => {
  return (
    <div className={clsx(styles.wrapper, className)} {...rest}>
      <iframe
        src={`https://www.youtube-nocookie.com/embed/${id}`}
        className={styles.player}
        width="100%"
        height="100%"
        frameBorder="0"
        loading="lazy"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
      ></iframe>
    </div>
  );
};

export default YouTubeEmbed;
