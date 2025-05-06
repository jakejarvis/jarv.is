import { unstable_cache as cache } from "next/cache";
import Image from "next/image";
import { EmbeddedTweet, TweetNotFound } from "react-tweet";
import { fetchTweet as _fetchTweet } from "react-tweet/api";
import { cn } from "@/lib/utils";

const fetchTweet = cache(_fetchTweet, undefined, {
  revalidate: false, // cache indefinitely
  tags: ["tweet"],
});

const Tweet = async ({ id, className }: { id: string; className?: string }) => {
  try {
    const { data } = await fetchTweet(id);

    return (
      <div className={cn("min-h-30 *:mx-auto! *:font-sans!", className)}>
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
          />
        ) : (
          <TweetNotFound />
        )}
      </div>
    );
  } catch (error) {
    console.error(error);

    return (
      <div className={cn("min-h-30 *:mx-auto! *:font-sans!", className)}>
        <TweetNotFound />
      </div>
    );
  }
};

export default Tweet;
