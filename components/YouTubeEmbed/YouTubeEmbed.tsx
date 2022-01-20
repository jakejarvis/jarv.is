import classNames from "classnames";
import ReactPlayer from "react-player/youtube";

import styles from "./YouTubeEmbed.module.css";

type Props = {
  id: string;
  className?: string;
};

const YouTubeEmbed = ({ id, className, ...rest }: Props) => (
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
