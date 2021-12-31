import ReactPlayer from "react-player/lazy";
import type { ReactPlayerProps } from "react-player";

import styles from "./FullPageVideo.module.scss";

export default function FullPageVideo(props: ReactPlayerProps) {
  return (
    <div className={styles.wrapper}>
      <ReactPlayer className={styles.react_player} width="100%" height="100%" {...props} />
    </div>
  );
}
