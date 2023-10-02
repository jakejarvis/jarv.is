import Link from "../Link";
import { GoHeartFill } from "react-icons/go";
import { SiNextdotjs } from "react-icons/si";
import { styled, theme, keyframes } from "../../lib/styles/stitches.config";
import * as config from "../../lib/config";
import type { ComponentPropsWithoutRef } from "react";

const Wrapper = styled("footer", {
  width: "100%",
  padding: "1.25em 1.5em",
  borderTop: `1px solid ${theme.colors.kindaLight}`,
  backgroundColor: theme.colors.backgroundOuter,
  color: theme.colors.mediumDark,
  transition: `background ${theme.transitions.fade}, border ${theme.transitions.fade}`,

  "@medium": {
    padding: "1em 1.25em",
  },
});

const Row = styled("div", {
  display: "flex",
  width: "100%",
  maxWidth: theme.sizes.maxLayoutWidth,
  margin: "0 auto",
  justifyContent: "space-between",
  fontSize: "0.85em",
  lineHeight: 2.3,

  // stack columns on left instead of flexboxing across
  "@medium": {
    fontSize: "0.8em",
    display: "block",
  },
});

const PlainLink = styled(Link, {
  color: theme.colors.mediumDark,
});

const Icon = styled("svg", {
  width: "1.25em",
  height: "1.25em",
  verticalAlign: "-0.25em",
  margin: "0 0.075em",
});

const Heart = styled("span", {
  display: "inline-block",
  color: theme.colors.error, // somewhat ironically color the heart with the themed "error" red... </3

  "@media (prefers-reduced-motion: no-preference)": {
    animation: `${keyframes({
      "0%": { transform: "scale(1)" },
      "2%": { transform: "scale(1.25)" },
      "4%": { transform: "scale(1)" },
      "6%": { transform: "scale(1.2)" },
      "8%": { transform: "scale(1)" },
      // pause for ~9 out of 10 seconds
      "100%": { transform: "scale(1)" },
    })} 10s ease 7.5s infinite`,
    willChange: "transform",
  },
});

export type FooterProps = ComponentPropsWithoutRef<typeof Wrapper>;

const Footer = ({ ...rest }: FooterProps) => {
  return (
    <Wrapper {...rest}>
      <Row>
        <div>
          Content{" "}
          <PlainLink href="/license/" title={config.license} underline={false}>
            licensed under {config.licenseAbbr}
          </PlainLink>
          ,{" "}
          <PlainLink href="/previously/" title="Previously on..." underline={false}>
            {config.copyrightYearStart}
          </PlainLink>{" "}
          – {new Date(process.env.RELEASE_DATE || Date.now()).getUTCFullYear()}.
        </div>

        <div>
          Made with{" "}
          <Heart title="Love">
            <Icon as={GoHeartFill} css={{ strokeWidth: 2 }} />
          </Heart>{" "}
          and{" "}
          <PlainLink
            href="https://nextjs.org/"
            title="Powered by Next.js"
            aria-label="Next.js"
            underline={false}
            css={{
              "&:hover, &:focus-visible": {
                color: theme.colors.medium,
              },
            }}
          >
            <Icon as={SiNextdotjs} />
          </PlainLink>
          .{" "}
          <PlainLink
            href={`https://github.com/${config.githubRepo}`}
            title="View Source on GitHub"
            underline={false}
            css={{
              paddingBottom: "2px",
              borderBottom: `1px solid ${theme.colors.light}`,

              "&:hover, &:focus-visible": {
                borderColor: theme.colors.kindaLight,
              },
            }}
          >
            View source.
          </PlainLink>
        </div>
      </Row>
    </Wrapper>
  );
};

export default Footer;
