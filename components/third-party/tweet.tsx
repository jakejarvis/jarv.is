import { unstable_cache as cache } from "next/cache";
import Image from "next/image";
import type { Tweet as TweetType } from "react-tweet/api";
import { EmbeddedTweet, TweetNotFound } from "react-tweet";
import { fetchTweet as _fetchTweet } from "react-tweet/api";
import { cn } from "@/lib/utils";

const fetchTweet = cache(_fetchTweet, undefined, {
  revalidate: false, // cache indefinitely
  tags: ["tweet"],
});

const TweetContent = ({ data, className }: { data: TweetType; className?: string }) => {
  return (
    <div
      className={cn(
        "my-6 min-h-30",
        "*:[--tweet-body-font-size:var(--text-base)]! *:[--tweet-body-line-height:var(--leading-normal)]! *:[--tweet-container-margin:0_auto]! *:[--tweet-font-family:var(--font-sans)]! *:[--tweet-info-font-size:var(--text-sm)]! *:[--tweet-info-line-height:var(--leading-normal)]!",
        className
      )}
    >
      <EmbeddedTweet
        tweet={data}
        components={{
          // https://react-tweet.vercel.app/twitter-theme/api-reference#custom-tweet-components
          // eslint-disable-next-line jsx-a11y/alt-text
          AvatarImg: (props) => <Image {...props} unoptimized />,
          // eslint-disable-next-line jsx-a11y/alt-text
          MediaImg: (props) => <Image {...props} fill unoptimized />,
        }}
      />
    </div>
  );
};

const Tweet = async ({ id, className }: { id: string; className?: string }) => {
  let data: TweetType | undefined;

  try {
    const result = await fetchTweet(id);
    data = result?.data;
  } catch (error) {
    console.error(error);
  }

  if (!data) {
    return (
      <div className={cn("my-6 min-h-30 *:mx-auto! *:font-sans!", className)}>
        <TweetNotFound />
      </div>
    );
  }

  return <TweetContent data={data} className={className} />;
};

export default Tweet;
