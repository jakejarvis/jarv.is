import { styled } from "../../lib/styles/stitches.config";
import type { ComponentProps } from "react";

const Banner = styled("div", {
  backgroundColor: "$backgroundInner",
  borderBottom: "1px solid $kindaLight",

  // light-dark theme switch fading
  transition: "background 0.25s ease, border 0.25s ease",

  "@medium": {
    fontSize: "0.9em",
  },
});

const Text = styled("span", {});

const Link = styled("a", {
  display: "block",
  width: "100%",
  padding: "0.5em 0",
  color: "$text",
  fontWeight: 500,
  letterSpacing: "0.025em",
  textAlign: "center",
  textDecoration: "none",

  "&:hover": {
    [`& ${Text}`]: {
      color: "transparent",
      // blue to yellow gradient:
      // https://www.joshwcomeau.com/gradient-generator?colors=465ea2|facc15&angle=90&colorMode=lrgb&precision=1&easingCurve=0.34871381110583766|1.05|0.4604935927859516|0.8607688656858092
      backgroundImage:
        "linear-gradient(90deg, hsl(224deg 40% 45%) 18%, hsl(38deg 32% 59%) 68%, hsl(48deg 96% 53%) 100%)",
      backgroundClip: "text",
    },
  },
});

const Flag = styled("span", {
  marginRight: "0.4em",
  fontSize: "1.75em",
  verticalAlign: "-0.15em",
});

export type HeadingProps = ComponentProps<typeof Banner>;

const Ukraine = ({ ...rest }) => {
  return (
    <Banner {...rest}>
      <Link href="https://helpukrainewin.org/" target="_blank" rel="noopener noreferrer">
        <Flag>🇺🇦</Flag>
        <Text>#StandWithUkraine</Text>
      </Link>
    </Banner>
  );
};

export default Ukraine;
