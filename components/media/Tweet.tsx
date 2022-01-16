import TweetEmbed from "react-tweet-embed";

type CustomTweetProps = {
  id: string;
};

const Tweet = (props: CustomTweetProps) => (
  <TweetEmbed
    id={props.id}
    options={{
      dnt: true,
      align: "center",
    }}
  />
);

export default Tweet;
