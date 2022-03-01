import { memo } from "react";
import { styled, keyframes } from "../../lib/styles/stitches.config";

const pulse = keyframes({
  "0%, 80%, 100%": {
    transform: "scale(0)",
  },
  "40%": {
    transform: "scale(0.6)",
  },
});

const Wrapper = styled("div", {
  display: "inline-block",
  textAlign: "center",
});

const Box = styled("div", {
  display: "inline-block",
  height: "100%",
  animation: `${pulse} 1.5s infinite ease-in-out both`,
  backgroundColor: "$mediumLight",
});

export type LoadingProps = {
  width: number; // of entire container, in pixels
  boxes?: number; // total number of boxes (default: 3)
  timing?: number; // staggered timing between each box's pulse, in seconds (default: 0.1s)
  className?: string;
};

const Loading = ({ width, boxes = 3, timing = 0.1, className }: LoadingProps) => {
  // each box is just an empty div
  const divs = [];

  // allow a custom number of pulsing boxes (defaults to 3)
  for (let i = 0; i < boxes; i++) {
    // width of each box correlates with number of boxes (with a little padding)
    // each individual box's animation has a staggered start in corresponding order
    divs.push(
      <Box
        key={i}
        css={{
          width: `${width / (boxes + 1)}px`,
          animationDelay: `${i * timing}s`,
        }}
      />
    );
  }

  return (
    <Wrapper
      className={className}
      style={{
        width: `${width}px`,
        height: `${width / 2}px`,
      }}
    >
      {divs}
    </Wrapper>
  );
};

export default memo(Loading);
