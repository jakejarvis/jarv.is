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
  };
  thumbnail?: string;
  subs?: string;
  autoplay?: boolean;
  className?: string;
};

const Video = ({ src, thumbnail, subs, autoplay, className, ...rest }: VideoProps) => {
  // fix hydration issues: https://github.com/cookpete/react-player/issues/1428
  const hasMounted = useHasMounted();

  const url = [
    src.webm && {
      src: src.webm,
      type: "video/webm",
    },
    src.mp4 && {
      src: src.mp4,
      type: "video/mp4",
    },
  ];

  const config = {
    file: {
      attributes: {
        controlsList: "nodownload",
        preload: "metadata",
        autoPlay: !!autoplay,
        muted: !!autoplay,
        loop: !!autoplay,
      },
    },
  };

  if (thumbnail) {
    // @ts-ignore
    config.file.attributes.poster = thumbnail;
  }

  if (subs) {
    // @ts-ignore
    config.file.tracks = [
      {
        kind: "subtitles",
        src: subs,
        srcLang: "en",
        label: "English",
        default: true,
      },
    ];
  }

  return (
    <Wrapper className={className}>
      {hasMounted && <Player width="100%" height="100%" url={url} controls={!autoplay} config={config} {...rest} />}
    </Wrapper>
  );
};

export default Video;
