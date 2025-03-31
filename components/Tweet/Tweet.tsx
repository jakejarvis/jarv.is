import { Suspense } from "react";
import Image from "next/image";
import { EmbeddedTweet, TweetSkeleton, TweetNotFound } from "react-tweet";
import { getTweet } from "react-tweet/api";
import clsx from "clsx";
import type { ComponentPropsWithoutRef } from "react";

import styles from "./Tweet.module.css";

export type TweetProps = Omit<ComponentPropsWithoutRef<typeof EmbeddedTweet>, "tweet"> & {
  id: string;
  className?: string;
};

const Tweet = async ({ id, className, ...rest }: TweetProps) => {
  try {
    const tweet = await getTweet(id, {
      next: {
        // cache for 12 hours
        revalidate: 43200,
      },
    });

    return (
      <div className={clsx(styles.tweet, className)}>
        <Suspense fallback={<TweetSkeleton />}>
          {tweet ? (
            <EmbeddedTweet
              tweet={tweet}
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
        </Suspense>
      </div>
    );
  } catch (
    error // eslint-disable-line @typescript-eslint/no-unused-vars
  ) {
    return (
      <div className={clsx(styles.tweet, className)}>
        <TweetNotFound />
      </div>
    );
  }
};

export default Tweet;
