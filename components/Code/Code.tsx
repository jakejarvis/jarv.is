import { styled } from "../../lib/styles/stitches.config";

const Code = styled("code", {
  fontSize: "0.925em",
  backgroundColor: "$codeBackground",
  border: "1px solid $kindaLight",
  borderRadius: "$rounded",

  // light-dark theme switch fading
  transition: "background 0.25s ease, border 0.25s ease",
});

export default Code;
