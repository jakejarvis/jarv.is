import Image from "next/image";
import { Tweet } from "react-tweet";
import clsx from "clsx";
import type { ComponentPropsWithoutRef } from "react";

import styles from "./TweetEmbed.module.css";

export type TweetEmbedProps = ComponentPropsWithoutRef<typeof Tweet> & {
  id: string;
  className?: string;
};

const TweetEmbed = ({ id, className, ...rest }: TweetEmbedProps) => {
  return (
    <div className={clsx(styles.tweet, className)}>
      <Tweet
        key={`tweet-${id}`}
        id={id}
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
