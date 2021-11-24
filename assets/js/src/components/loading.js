import { h } from "preact";

const Loading = (props) => {
  // allow a custom number of pulsing boxes (defaults to 3)
  const boxes = props.boxes || 3;
  // each box is just an empty div
  const divs = [];

  for (let i = 0; i < boxes; i++) {
    divs.push(
      <div
        style={{
          width: `${props.width / (boxes + 1)}px`,
          height: "100%",
          display: "inline-block",
          animation: "loading 1.5s infinite ease-in-out both", // see assets/sass/components/_animation.scss
          "animation-delay": `${i * 0.16}s`,
        }}
      />
    );
  }

  return (
    <div class="loading" style={{ width: `${props.width}px`, display: "inline-block", "text-align": "center" }}>
      {divs}
    </div>
  );
};

export default Loading;
