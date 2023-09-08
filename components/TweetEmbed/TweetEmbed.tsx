import { useEffect, useRef } from "react";
import Image from "next/image";
import { Tweet } from "react-tweet";
import useTheme from "../../hooks/useTheme";
import { styled } from "../../lib/styles/stitches.config";
import type { ComponentPropsWithoutRef, ElementRef } from "react";

const Wrapper = styled("div", {
  minHeight: "300px", // help with layout shift

  "& .react-tweet-theme": {
    "--tweet-container-margin": "1.5rem auto",
  },
});

export type TweetEmbedProps = ComponentPropsWithoutRef<typeof Tweet> & {
  className?: string;
};

const TweetEmbed = ({ id, className, ...rest }: TweetEmbedProps) => {
  const containerRef = useRef<ElementRef<typeof Wrapper>>(null);
  const { activeTheme } = useTheme();

  useEffect(() => {
    if (containerRef.current) {
      // setting 'data-theme' attribute of parent div changes the tweet's theme (no re-render necessary)
      containerRef.current.dataset.theme = activeTheme;
    }
  }, [activeTheme]);

  return (
    <Wrapper ref={containerRef} className={className}>
      <Tweet
        key={`tweet-${id}`}
        id={id}
        apiUrl={`/api/tweet/?id=${id}`} // edge function at pages/api/tweet.ts
        components={{
          // https://react-tweet.vercel.app/twitter-theme/api-reference#custom-tweet-components
          // eslint-disable-next-line jsx-a11y/alt-text
          AvatarImg: (props) => <Image {...props} />,
          // eslint-disable-next-line jsx-a11y/alt-text
          MediaImg: (props) => <Image {...props} fill />,
        }}
        {...rest}
      />
    </Wrapper>
  );
};

export default TweetEmbed;
