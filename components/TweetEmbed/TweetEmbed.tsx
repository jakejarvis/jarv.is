import { Suspense } from "react";
import Image from "next/image";
import { EmbeddedTweet, TweetSkeleton, TweetNotFound } from "react-tweet";
import { getTweet } from "react-tweet/api";
import clsx from "clsx";
import type { ComponentPropsWithoutRef } from "react";

import styles from "./TweetEmbed.module.css";

export type TweetEmbedProps = Omit<ComponentPropsWithoutRef<typeof EmbeddedTweet>, "tweet"> & {
  id: string;
  className?: string;
};

const TweetEmbed = async ({ id, className, ...rest }: TweetEmbedProps) => {
  try {
    const tweet = await getTweet(id);

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
    return <TweetNotFound />;
  }
};

export default TweetEmbed;
