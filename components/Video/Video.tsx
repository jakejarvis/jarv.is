import ReactPlayer from "react-player/file";
import useHasMounted from "../../hooks/useHasMounted";
import { styled, theme } from "../../lib/styles/stitches.config";
import type { SourceProps } from "react-player/base";
import type { FilePlayerProps } from "react-player/file";

const Player = styled(ReactPlayer, {
  "& video": {
    borderRadius: theme.radii.corner,
  },
});

const Wrapper = styled("div", {
  variants: {
    // determines placement of the player. true expands to full width while keeping the aspect ratio, false retains the
    // video's native dimensions (but still shrinks if the parent is narrower than the video).
    responsive: {
      true: {
        position: "relative",
        paddingTop: "56.25%", // ratio of 1280x720

        [`& ${Player}`]: {
          position: "absolute",
          top: 0,
          left: 0,
        },
      },
      false: {
        [`& ${Player}`]: {
          margin: "0 auto",
        },
      },
    },
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
  title?: string;
  autoplay?: boolean;
  responsive?: boolean;
  className?: string;
};

const Video = ({ src, title, autoplay = false, responsive = true, className, ...rest }: VideoProps) => {
  // fix hydration issues: https://github.com/cookpete/react-player/issues/1428
  const hasMounted = useHasMounted();

  const playerProps: Required<Pick<FilePlayerProps, "config">> & { url: SourceProps[] } = {
    url: [],
    config: {
      attributes: {
        controlsList: "nodownload",
        preload: "metadata",
        poster: src.image, // thumbnail
        title: title,
        autoPlay: autoplay,
        loop: autoplay,
        muted: autoplay, // no sound when autoplaying
        controls: !autoplay, // only show controls when not autoplaying
      },
      tracks: [],
    },
  };

  if (!src || (!src.mp4 && !src.webm)) {
    throw new Error("'src' prop must include either 'mp4' or 'webm' URL.");
  }

  if (src.webm) {
    playerProps.url.push({
      src: src.webm,
      type: "video/webm",
    });
  }
  if (src.mp4) {
    playerProps.url.push({
      src: src.mp4,
      type: "video/mp4",
    });
  }
  if (src.vtt) {
    playerProps.config.tracks?.push({
      kind: "subtitles",
      src: src.vtt,
      srcLang: "en",
      label: "English",
      default: true,
    });
  }

  return (
    <Wrapper responsive={responsive} className={className}>
      {hasMounted && <Player width="100%" height="100%" {...playerProps} {...rest} />}
    </Wrapper>
  );
};

export default Video;
