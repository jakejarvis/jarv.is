import { EmbeddedTweet, TweetNotFound } from "react-tweet";
import type { Tweet as TweetType } from "react-tweet/api";
import { fetchTweet } from "react-tweet/api";

import { cn } from "@/lib/utils";

/** Async server component: the tweet is fetched while the page is (pre)rendered and baked into its HTML. */
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

  return (
    <div
      className={cn(
        "my-6 min-h-30",
        "*:[--tweet-body-font-size:var(--text-base)]! *:[--tweet-body-line-height:var(--leading-normal)]! *:[--tweet-container-margin:0_auto]! *:[--tweet-font-family:var(--font-sans)]! *:[--tweet-info-font-size:var(--text-sm)]! *:[--tweet-info-line-height:var(--leading-normal)]!",
        className,
      )}
    >
      <EmbeddedTweet tweet={data} />
    </div>
  );
};

export { Tweet };
