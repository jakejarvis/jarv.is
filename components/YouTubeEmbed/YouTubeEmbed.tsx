import classNames from "classnames";
import ReactPlayer from "react-player/youtube";
import type { YouTubePlayerProps } from "react-player/youtube";

import styles from "./YouTubeEmbed.module.css";

export type YouTubeEmbedProps = Partial<YouTubePlayerProps> & {
  id: string;
  className?: string;
};

const YouTubeEmbed = ({ id, className, ...rest }: YouTubeEmbedProps) => (
  <div className={classNames(styles.wrapper, className)}>
    <ReactPlayer
      width="100%"
      height="100%"
      url={`https://www.youtube-nocookie.com/watch?v=${id}`}
      light={`https://i.ytimg.com/vi/${id}/hqdefault.jpg`}
      controls
      {...rest}
    />
  </div>
);

export default YouTubeEmbed;
