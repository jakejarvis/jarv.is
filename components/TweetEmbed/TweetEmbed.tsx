import Tweet from "react-tweet-embed";

type Props = {
  id: string;
  options?: object;
  className?: string;
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
