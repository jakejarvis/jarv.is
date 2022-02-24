import Tweet from "react-tweet-embed";

export type TweetEmbedProps = {
  id: string;
  options?: object;
  className?: string;
};

const TweetEmbed = ({ id, className, options }: TweetEmbedProps) => (
  <Tweet
    className={className}
    tweetId={id}
    options={{
      dnt: true,
      align: "center",
      ...options,
    }}
  />
);

export default TweetEmbed;
