import { styled } from "../../lib/styles/stitches.config";

const Code = styled("code", {
  fontSize: "0.925em",
  backgroundColor: "$codeBackground",
  border: "1px solid $kindaLight",
  borderRadius: "$rounded",
  transition: "background $fade, border $fade",
});

export default Code;
