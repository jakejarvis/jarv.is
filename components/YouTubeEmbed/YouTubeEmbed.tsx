import ReactPlayer from "react-player/youtube";
import { useHasMounted } from "../../hooks/use-has-mounted";
import { styled } from "../../lib/styles/stitches.config";
import type { YouTubePlayerProps } from "react-player/youtube";

const Wrapper = styled("div", {
  position: "relative",
  paddingTop: "56.25%",

  "& > div": {
    position: "absolute",
    top: 0,
    left: 0,
  },

  "& .react-player__preview, & iframe": {
    borderRadius: "$rounded",
  },
});

export type YouTubeEmbedProps = Partial<YouTubePlayerProps> & {
  id: string;
  className?: string;
};

const YouTubeEmbed = ({ id, className, ...rest }: YouTubeEmbedProps) => {
  // fix hydration issues: https://github.com/cookpete/react-player/issues/1428
  const hasMounted = useHasMounted();
  if (!hasMounted) {
    return null;
  }

  return (
    <Wrapper className={className}>
      <ReactPlayer
        width="100%"
        height="100%"
        url={`https://www.youtube-nocookie.com/watch?v=${id}`}
        light={`https://i.ytimg.com/vi/${id}/hqdefault.jpg`}
        controls
        {...rest}
      />
    </Wrapper>
  );
};

export default YouTubeEmbed;
