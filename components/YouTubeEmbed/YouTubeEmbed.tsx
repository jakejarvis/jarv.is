import ReactPlayer from "react-player/youtube";
import clsx from "clsx";
import useHasMounted from "../../hooks/useHasMounted";
import type { YouTubePlayerProps } from "react-player/youtube";

import styles from "./YouTubeEmbed.module.css";

export type YouTubeEmbedProps = Partial<YouTubePlayerProps> & {
  id: string;
  className?: string;
};

const YouTubeEmbed = ({ id, className, ...rest }: YouTubeEmbedProps) => {
  // fix hydration issues: https://github.com/cookpete/react-player/issues/1428
  const hasMounted = useHasMounted();

  return (
    <div className={clsx(styles.wrapper, className)}>
      {hasMounted && (
        <ReactPlayer
          width="100%"
          height="100%"
          className={styles.player}
          url={`https://www.youtube-nocookie.com/watch?v=${id}`}
          light={`https://i.ytimg.com/vi/${id}/hqdefault.jpg`}
          controls
          {...rest}
        />
      )}
    </div>
  );
};

export default YouTubeEmbed;
