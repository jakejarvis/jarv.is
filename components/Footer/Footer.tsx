import { memo } from "react";
import NextLink from "next/link";
import { HeartIcon, NextjsLogo } from "../Icons";
import { keyframes, styled } from "../../lib/styles/stitches.config";
import * as config from "../../lib/config";
import type { ComponentProps } from "react";

const Wrapper = styled("footer", {
  width: "100%",
  padding: "1.25em 1.5em",
  borderTop: "1px solid $kindaLight",
  backgroundColor: "$backgroundOuter",
  color: "$mediumDark",

  // light-dark theme switch fading
  transition: "background 0.25s ease, border 0.25s ease",

  "@medium": {
    padding: "1em 1.25em",
  },
});

const Row = styled("div", {
  display: "flex",
  width: "100%",
  maxWidth: "865px",
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

const Link = styled("a", {
  color: "$mediumDark",
  textDecoration: "none",
});

const NextjsLink = styled(Link, {
  "&:hover": {
    color: "$medium",
  },
});

const ViewSourceLink = styled(Link, {
  paddingBottom: "2px",
  borderBottom: "1px solid $light",

  "&:hover": {
    borderColor: "$kindaLight",
  },
});

const beat = keyframes({
  "0%": { transform: "scale(1)" },
  "2%": { transform: "scale(1.25)" },
  "4%": { transform: "scale(1)" },
  "6%": { transform: "scale(1.2)" },
  "8%": { transform: "scale(1)" },
  // pause for ~9 out of 10 seconds
  "100%": { transform: "scale(1)" },
});

const Heart = styled("span", {
  display: "inline-block",
  animation: `${beat} 10s infinite`,
  animationDelay: "7.5s",
  willChange: "transform",
});

const Icon = styled("svg", {
  width: "1.25em",
  height: "1.25em",
  verticalAlign: "-0.25em",
  margin: "0 0.075em",
});

export type FooterProps = ComponentProps<typeof Wrapper>;

const Footer = ({ ...rest }: FooterProps) => (
  <Wrapper {...rest}>
    <Row>
      <div>
        Content{" "}
        <NextLink href="/license/" prefetch={false} passHref={true}>
          <Link title="Creative Commons Attribution 4.0 International">licensed under CC-BY-4.0</Link>
        </NextLink>
        ,{" "}
        <NextLink href="/previously/" prefetch={false} passHref={true}>
          <Link title="Previously on...">2001</Link>
        </NextLink>{" "}
        – {new Date().getFullYear()}.
      </div>

      <div>
        Made with{" "}
        <Heart title="Love">
          <Icon as={HeartIcon} />
        </Heart>{" "}
        and{" "}
        <NextjsLink
          href="https://nextjs.org/"
          title="Powered by Next.js"
          aria-label="Next.js"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Icon as={NextjsLogo} fill="currentColor" />
        </NextjsLink>
        .{" "}
        <ViewSourceLink
          href={`https://github.com/${config.githubRepo}`}
          title="View Source on GitHub"
          target="_blank"
          rel="noopener noreferrer"
        >
          View source.
        </ViewSourceLink>
      </div>
    </Row>
  </Wrapper>
);

export default memo(Footer);
