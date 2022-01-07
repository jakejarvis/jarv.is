import dynamic from "next/dynamic";
import type { ReactPlayerProps } from "react-player";

import styles from "./Video.module.css";

const ReactPlayer = dynamic(() => import("react-player/lazy"));

const Video = (props: ReactPlayerProps) => (
  <div className={styles.wrapper}>
    <ReactPlayer className={styles.react_player} width="100%" height="100%" {...props} />
  </div>
);

export default Video;
