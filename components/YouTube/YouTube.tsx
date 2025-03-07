import { YouTubeEmbed } from "@next/third-parties/google";

import styles from "./YouTube.module.css";

export type YouTubeProps = {
  id: string;
};

const YouTube = ({ id }: YouTubeProps) => {
  return (
    <div className={styles.wrapper}>
      <YouTubeEmbed videoid={id} />
    </div>
  );
};

export default YouTube;
