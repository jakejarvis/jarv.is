import { unstable_cache } from "next/cache";
import Image from "next/image";
import { EmbeddedTweet, TweetNotFound } from "react-tweet";
import { fetchTweet as _fetchTweet } from "react-tweet/api";
import clsx from "clsx";
import type { ComponentPropsWithoutRef } from "react";

import styles from "./Tweet.module.css";

export type TweetProps = Omit<ComponentPropsWithoutRef<typeof EmbeddedTweet>, "tweet"> & {
  id: string;
  className?: string;
};

const fetchTweet = unstable_cache(async (id: string) => _fetchTweet(id), [], {
  // cache indefinitely
  revalidate: false,
});

const Tweet = async ({ id, className, ...rest }: TweetProps) => {
  try {
    const { data } = await fetchTweet(id);

    return (
      <div className={clsx(styles.tweet, className)}>
        {data ? (
          <EmbeddedTweet
            tweet={data}
            components={{
              // https://react-tweet.vercel.app/twitter-theme/api-reference#custom-tweet-components
              // eslint-disable-next-line jsx-a11y/alt-text
              AvatarImg: (props) => <Image {...props} unoptimized />,
              // eslint-disable-next-line jsx-a11y/alt-text
              MediaImg: (props) => <Image {...props} fill unoptimized />,
            }}
            {...rest}
          />
        ) : (
          <TweetNotFound />
        )}
      </div>
    );
  } catch (error) {
    console.error(error);

    return (
      <div className={clsx(styles.tweet, className)}>
        <TweetNotFound />
      </div>
    );
  }
};

export default Tweet;
