import ReactPlayer from "react-player/file";
import { useHasMounted } from "../../hooks/use-has-mounted";
import { styled } from "../../lib/styles/stitches.config";
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
    borderRadius: "$rounded",
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

const Video = ({ src, autoplay, className, ...rest }: VideoProps) => {
  // fix hydration issues: https://github.com/cookpete/react-player/issues/1428
  const hasMounted = useHasMounted();

  const files: FilePlayerProps["url"] = [
    // @ts-ignore
    src.webm && {
      src: src.webm,
      type: "video/webm",
    },
    // @ts-ignore
    src.mp4 && {
      src: src.mp4,
      type: "video/mp4",
    },
  ];

  const config: FilePlayerProps["config"] = {
    attributes: {
      controlsList: "nodownload",
      preload: "metadata",
      poster: src.image, // thumbnail
      autoPlay: autoplay,
      loop: !!autoplay,
      muted: !!autoplay, // no sound when autoplaying
      controls: !autoplay, // only show controls when not autoplaying
    },
  };

  if (src.vtt) {
    config.tracks = [
      {
        kind: "subtitles",
        src: src.vtt,
        srcLang: "en",
        label: "English",
        default: true,
      },
    ];
  }

  return (
    <Wrapper className={className}>
      {hasMounted && <Player width="100%" height="100%" url={files} config={{ file: config }} {...rest} />}
    </Wrapper>
  );
};

export default Video;
