import { useEffect, useRef } from "react";
import Image from "next/image";
import { Tweet } from "react-tweet";
import clsx from "clsx";
import useTheme from "../../hooks/useTheme";
import type { ComponentPropsWithoutRef, ElementRef } from "react";

import styles from "./TweetEmbed.module.css";

export type TweetEmbedProps = ComponentPropsWithoutRef<typeof Tweet> & {
  className?: string;
};

const TweetEmbed = ({ id, className, ...rest }: TweetEmbedProps) => {
  const containerRef = useRef<ElementRef<"div">>(null);
  const { activeTheme } = useTheme();

  useEffect(() => {
    if (containerRef.current) {
      // setting 'data-theme' attribute of parent div changes the tweet's theme (no re-render necessary)
      containerRef.current.dataset.theme = activeTheme;
    }
  }, [activeTheme]);

  return (
    <div ref={containerRef} className={clsx(styles.tweet, className)}>
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
    </div>
  );
};

export default TweetEmbed;
