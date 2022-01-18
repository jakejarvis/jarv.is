import Tweet from "react-tweet-embed";

type Props = {
  id: string;
};

const TweetEmbed = (props: Props) => (
  <Tweet
    id={props.id}
    options={{
      dnt: true,
      align: "center",
    }}
  />
);

export default TweetEmbed;
