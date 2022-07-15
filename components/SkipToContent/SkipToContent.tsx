import { styled, theme } from "../../lib/styles/stitches.config";

const HiddenLink = styled("a", {
  // accessible invisibility stuff pulled from @reach/skip-nav:
  // https://github.com/reach/reach-ui/blob/main/packages/skip-nav/styles.css
  border: 0,
  clip: "rect(0 0 0 0)",
  height: "1px",
  width: "1px",
  margin: "-1px",
  padding: 0,
  overflow: "hidden",
  position: "absolute",

  "&:focus": {
    padding: "1rem",
    position: "fixed",
    top: "10px",
    left: "10px",
    zIndex: 99999,
    width: "auto",
    height: "auto",
    clip: "auto",
    background: theme.colors.superDuperLight,
    color: theme.colors.link,
    border: `2px solid ${theme.colors.kindaLight}`,
    borderRadius: theme.radii.corner,
    textDecoration: "underline",
  },
});

const skipNavId = "skip-nav";

export const SkipToContentLink = () => {
  return (
    <HiddenLink href={`#${skipNavId}`} tabIndex={0}>
      Skip to content
    </HiddenLink>
  );
};

export const SkipToContentTarget = () => {
  return <div id={skipNavId} />;
};

export default SkipToContentLink;
