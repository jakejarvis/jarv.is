import { useState } from "react";
import { TwitterTweetEmbed } from "react-twitter-embed";
import { useUpdateEffect } from "react-use";
import { useTheme } from "../../hooks/use-theme";
import { styled } from "../../lib/styles/stitches.config";

const Wrapper = styled("div", {
  // reserve a moderate amount of space for the widget, it takes a while to load...
  minHeight: "300px",
});

export type TweetEmbedProps = {
  id: string;
  options?: Record<string, unknown>;
  className?: string;
};

const TweetEmbed = ({ id, options, className }: TweetEmbedProps) => {
  const { activeTheme } = useTheme();
  const [widgetTheme, setWidgetTheme] = useState(activeTheme);

  useUpdateEffect(() => {
    setWidgetTheme(activeTheme === "dark" ? activeTheme : "light");
  }, [activeTheme]);

  return (
    <Wrapper className={className}>
      <TwitterTweetEmbed
        tweetId={id}
        options={{
          dnt: true,
          align: "center",
          theme: widgetTheme,
          ...options,
        }}
        // changing this key forces the iframe URL to reformulate itself and update the theme:
        key={`tweet-${id}-${widgetTheme}`}
      />
    </Wrapper>
  );
};

export default TweetEmbed;
