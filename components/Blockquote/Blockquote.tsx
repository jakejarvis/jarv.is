import { styled, theme } from "../../lib/styles/stitches.config";

const Blockquote = styled("blockquote", {
  marginLeft: 0,
  paddingLeft: "1.25em",
  borderLeft: `0.25em solid ${theme.colors.link}`,
  color: theme.colors.mediumDark,
});

export default Blockquote;
