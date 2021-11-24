import { h } from "preact";

const Loading = (props) => {
  // allow a custom number of pulsing boxes (defaults to 3)
  const boxes = props.boxes || 3;
  // each box is just an empty div
  const divs = [];

  for (let i = 0; i < boxes; i++) {
    divs.push(<div />);
  }

  return <div class="loading">{divs}</div>;
};

export default Loading;
