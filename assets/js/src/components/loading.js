import { h } from "preact";

const Loading = (props) => {
  // allow a custom number of pulsing boxes (defaults to 3)
  const boxes = props.boxes || 3;
  // each individual box's animation has a staggered start in corresponding order
  const animationTiming = 0.16; // seconds
  // each box is just an empty div
  const divs = [];

  for (let i = 0; i < boxes; i++) {
    divs.push(
      <div
        style={{
          // width of each box correlates with number of boxes (with a little padding)
          width: `${props.width / (boxes + 1)}px`,
          height: "100%",
          display: "inline-block",
          // see assets/sass/components/_animation.scss:
          animation: "loading 1.5s infinite ease-in-out both",
          "animation-delay": `${i * animationTiming}s`,
        }}
      />
    );
  }

  return (
    <div
      class="loading"
      style={{
        width: `${props.width}px`,
        height: `${props.width / 2}px`,
        display: "inline-block",
        "text-align": "center",
        ...props.style,
      }}
    >
      {divs}
    </div>
  );
};

export default Loading;
