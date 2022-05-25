import { styled, keyframes } from "../../lib/styles/stitches.config";
import type { ComponentProps } from "react";

// warning: super duper hacky CSS, probably don't use this.
// inspired by https://codepen.io/Knovour/pen/boJNPN

const Wrapper = styled("div", {
  position: "relative",
  overflowX: "hidden",
  width: "100%",
  height: "2em",
});

const Track = styled("div", {
  position: "absolute",
  width: "100%",
  height: "100%",
  whiteSpace: "nowrap",
  textAlign: "left",

  "@media (prefers-reduced-motion: no-preference)": {
    animation: `${keyframes({
      from: { transform: "translateX(100%)" },
      to: { transform: "translateX(-100%)" },
    })} 16s linear infinite`,
    willChange: "transform",

    "@medium": {
      animation: `${keyframes({
        from: { transform: "translateX(100%)" },
        to: { transform: "translateX(-180%)" },
      })} 20s linear infinite`,
    },
  },
});

export type MarqueeProps = ComponentProps<typeof Wrapper>;

const Marquee = ({ children, ...rest }: MarqueeProps) => {
  return (
    <Wrapper {...rest}>
      <Track>{children}</Track>
    </Wrapper>
  );
};

export default Marquee;
