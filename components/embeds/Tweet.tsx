import TweetEmbed from "react-tweet-embed";

const Tweet = (props: { id: string }) => (
  <TweetEmbed
    id={props.id}
    options={{
      dnt: true,
      align: "center",
    }}
  />
);

export default Tweet;
