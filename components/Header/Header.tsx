import { memo } from "react";
import Selfie from "../Selfie/Selfie";
import Menu from "../Menu/Menu";
import { styled } from "../../lib/styles/stitches.config";
import type { ComponentProps } from "react";

const Wrapper = styled("header", {
  width: "100%",
  height: "4.5em",
  padding: "0.7em 1.5em",
  borderBottom: "1px solid $kindaLight",
  backgroundColor: "$backgroundHeader",

  // light-dark theme switch fading
  transition: "color 0.25s ease, background 0.25s ease, border 0.25s ease",

  "@mobile": {
    padding: "0.75em 1.25em",
    height: "5.9em",
  },

  variants: {
    sticky: {
      true: {
        position: "sticky",
        top: 0,

        // blurry glass-like background effect (except on firefox)
        backdropFilter: "saturate(180%) blur(5px)",
        zIndex: 1000,
      },
    },
  },
});

const Nav = styled("nav", {
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  width: "100%",
  maxWidth: "865px",
  margin: "0 auto",
});

const ResponsiveMenu = styled(Menu, {
  "@mobile": {
    maxWidth: "325px",
  },

  "@superNarrow": {
    maxWidth: "225px",
  },
});

export type HeaderProps = ComponentProps<typeof Wrapper> & {
  sticky?: boolean;
};

const Header = ({ sticky, ...rest }: HeaderProps) => (
  <Wrapper sticky={sticky} {...rest}>
    <Nav>
      <Selfie />
      <ResponsiveMenu />
    </Nav>
  </Wrapper>
);

export default memo(Header);
