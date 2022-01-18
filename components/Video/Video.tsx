import ReactPlayer from "react-player/file";

import styles from "./Video.module.css";

type Props = {
  webm?: string;
  mp4?: string;
  thumbnail?: string;
  subs?: string;
  autoplay?: boolean;
};

const Video = ({ webm, mp4, thumbnail, subs, autoplay }: Props) => {
  const url = [
    webm && {
      src: webm,
      type: "video/webm",
    },
    mp4 && {
      src: mp4,
      type: "video/mp4",
    },
  ];

  const config = {
    file: {
      attributes: {
        controlsList: "nodownload",
        preload: "metadata",
        autoPlay: autoplay,
        muted: autoplay,
        loop: autoplay,
      },
    },
  };

  if (thumbnail) {
    // @ts-ignore
    config.file.attributes.poster = thumbnail;
  }

  if (subs) {
    // @ts-ignore
    config.file.tracks = [
      {
        kind: "subtitles",
        src: subs,
        srcLang: "en",
        label: "English",
        default: true,
      },
    ];
  }

  return (
    <div className={styles.wrapper}>
      {/* @ts-ignore */}
      <ReactPlayer width="100%" height="100%" url={url} config={config} controls={!autoplay} />
    </div>
  );
};

export default Video;
