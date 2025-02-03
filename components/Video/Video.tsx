"use client";

import ReactPlayer from "react-player/file";
import clsx from "clsx";
import useHasMounted from "../../hooks/useHasMounted";
import type { SourceProps } from "react-player/base";
import type { FilePlayerProps } from "react-player/file";

import styles from "./Video.module.css";

export type VideoProps = Partial<FilePlayerProps> & {
  src: {
    // at least one is required:
    webm?: string;
    mp4?: string;
    // optional:
    vtt?: string;
    image?: string;
  };
  title?: string;
  autoplay?: boolean;
  responsive?: boolean;
  className?: string;
};

const Video = ({ src, title, autoplay = false, responsive = true, className, ...rest }: VideoProps) => {
  // fix hydration issues: https://github.com/cookpete/react-player/issues/1428
  const hasMounted = useHasMounted();

  const playerProps: Required<Pick<FilePlayerProps, "config">> & { url: SourceProps[] } = {
    url: [],
    config: {
      attributes: {
        controlsList: "nodownload",
        preload: "metadata",
        poster: src.image, // thumbnail
        title: title,
        autoPlay: autoplay,
        loop: autoplay,
        muted: autoplay, // no sound when autoplaying
        controls: !autoplay, // only show controls when not autoplaying
      },
      tracks: [],
    },
  };

  if (!src || (!src.mp4 && !src.webm)) {
    throw new Error("'src' prop must include either 'mp4' or 'webm' URL.");
  }

  if (src.webm) {
    playerProps.url.push({
      src: src.webm,
      type: "video/webm",
    });
  }
  if (src.mp4) {
    playerProps.url.push({
      src: src.mp4,
      type: "video/mp4",
    });
  }
  if (src.vtt) {
    playerProps.config.tracks?.push({
      kind: "subtitles",
      src: src.vtt,
      srcLang: "en",
      label: "English",
      default: true,
    });
  }

  return (
    <div className={clsx(styles.wrapper, responsive && styles.responsive, className)}>
      {hasMounted && <ReactPlayer width="100%" height="100%" className={styles.player} {...playerProps} {...rest} />}
    </div>
  );
};

export default Video;
