import { styled } from "../../lib/styles/stitches.config";

const Content = styled("div", {
  fontSize: "0.9em",
  lineHeight: 1.7,
  color: "$text",

  "@medium": {
    fontSize: "0.925em",
    lineHeight: 1.85,
  },
});

export default Content;
