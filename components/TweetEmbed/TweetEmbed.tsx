import { useTheme } from "next-themes";
import { TwitterTweetEmbed } from "react-twitter-embed";

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
