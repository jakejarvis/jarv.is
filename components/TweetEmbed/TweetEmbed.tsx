import Tweet from "react-tweet-embed";

type TweetEmbedProps = {
  id: string;
  options?: object;
  className?: string;
};

const TweetEmbed = ({ id, className, options }: TweetEmbedProps) => (
  <Tweet
    className={className}
    id={id}
    options={{
      dnt: true,
      align: "center",
      ...options,
    }}
  />
);

export default TweetEmbed;
