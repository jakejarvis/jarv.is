import { TwitterTweetEmbed } from "react-twitter-embed";
import { useTheme } from "../../hooks/use-theme";

export type TweetEmbedProps = {
  id: string;
  options?: object;
  className?: string;
};

const TweetEmbed = ({ id, options }: TweetEmbedProps) => {
  const { resolvedTheme } = useTheme();

  return (
    <TwitterTweetEmbed
      tweetId={id}
      options={{
        dnt: true,
        align: "center",
        theme: resolvedTheme === "dark" ? "dark" : "light",
        ...options,
      }}
    />
  );
};

export default TweetEmbed;
