import ReactPlayer from "react-player/lazy";
import type { ReactPlayerProps } from "react-player";

import styles from "./FullPageVideo.module.scss";

const FullPageVideo = (props: ReactPlayerProps) => (
  <div className={styles.wrapper}>
    <ReactPlayer className={styles.react_player} width="100%" height="100%" {...props} />
  </div>
);

export default FullPageVideo;
