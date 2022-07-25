import ReactPlayer from "react-player/file";
import useHasMounted from "../../hooks/useHasMounted";
import { styled, theme } from "../../lib/styles/stitches.config";
import type { FilePlayerProps } from "react-player/file";

const Wrapper = styled("div", {
  position: "relative",
  paddingTop: "56.25%",
});

const Player = styled(ReactPlayer, {
  position: "absolute",
  top: 0,
  left: 0,

  "& video": {
    borderRadius: theme.radii.corner,
  },
});

export type VideoProps = Partial<FilePlayerProps> & {
  src: {
    // at least one is required:
    webm?: string;
    mp4?: string;
    // optional:
    vtt?: string;
    image?: string;
  };
  autoplay?: boolean;
  className?: string;
};

const Video = ({ src, autoplay = false, className, ...rest }: VideoProps) => {
  // fix hydration issues: https://github.com/cookpete/react-player/issues/1428
  const hasMounted = useHasMounted();

  const playerProps: FilePlayerProps = {
    url: [],
    config: {
      attributes: {
        controlsList: "nodownload",
        preload: "metadata",
        poster: src?.image, // thumbnail
        autoPlay: autoplay,
        loop: autoplay,
        muted: autoplay, // no sound when autoplaying
        controls: !autoplay, // only show controls when not autoplaying
      },
      tracks: [],
    },
  };

  if (src?.webm) {
    // @ts-ignore
    playerProps.url?.push({
      src: src.webm,
      type: "video/webm",
    });
  }
  if (src?.mp4) {
    // @ts-ignore
    playerProps.url?.push({
      src: src.mp4,
      type: "video/mp4",
    });
  }
  if (src?.vtt) {
    playerProps.config?.tracks?.push({
      kind: "subtitles",
      src: src.vtt,
      srcLang: "en",
      label: "English",
      default: true,
    });
  }

  return (
    <Wrapper className={className}>
      {hasMounted && <Player width="100%" height="100%" {...playerProps} {...rest} />}
    </Wrapper>
  );
};

export default Video;
