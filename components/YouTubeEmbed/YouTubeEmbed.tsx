import ReactPlayer from "react-player/youtube";

import styles from "./YouTubeEmbed.module.css";

type Props = {
  id: string;
};

const YouTubeEmbed = ({ id }: Props) => (
  <div className={styles.wrapper}>
    <ReactPlayer
      width="100%"
      height="100%"
      url={`https://www.youtube-nocookie.com/watch?v=${id}`}
      light={`https://i.ytimg.com/vi/${id}/hqdefault.jpg`}
      controls
    />
  </div>
);

export default YouTubeEmbed;
