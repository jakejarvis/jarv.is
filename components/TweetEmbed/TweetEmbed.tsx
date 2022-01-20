import Tweet from "react-tweet-embed";

type Props = {
  id: string;
  className?: string;
  options?: object;
};

const TweetEmbed = ({ id, className, options }: Props) => (
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
