import { styled, theme } from "../../lib/styles/stitches.config";

const Code = styled("code", {
  backgroundColor: theme.colors.codeBackground,
  border: `1px solid ${theme.colors.kindaLight}`,
  borderRadius: theme.radii.corner,
  transition: `background ${theme.transitions.fade}, border ${theme.transitions.fade}`,
});

export default Code;
