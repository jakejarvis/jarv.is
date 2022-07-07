import { styled, theme } from "../../lib/styles/stitches.config";

const Code = styled("code", {
  fontSize: "0.925em",
  backgroundColor: theme.colors.codeBackground,
  border: `1px solid ${theme.colors.kindaLight}`,
  borderRadius: theme.radii.rounded,
  transition: `background ${theme.transitions.fade}, border ${theme.transitions.fade}`,
});

export default Code;
