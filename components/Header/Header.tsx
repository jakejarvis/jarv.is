import Selfie from "../Selfie";
import Menu from "../Menu";
import { styled } from "../../lib/styles/stitches.config";
import type { ComponentProps } from "react";

const Wrapper = styled("header", {
  width: "100%",
  height: "4.5em",
  padding: "0.7em 1.5em",
  borderBottom: "1px solid $kindaLight",
  backgroundColor: "$backgroundHeader",

  // blurry glass-like background effect (except on firefox...?)
  backdropFilter: "saturate(180%) blur(5px)",
  zIndex: 9999,

  // light-dark theme switch fading
  transition: "background 0.25s ease, border 0.25s ease",

  "@medium": {
    padding: "0.75em 1.25em",
    height: "5.9em",
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
  "@medium": {
    maxWidth: "325px",
  },

  "@small": {
    maxWidth: "225px",
  },
});

export type HeaderProps = ComponentProps<typeof Wrapper>;

const Header = ({ ...rest }: HeaderProps) => {
  return (
    <Wrapper {...rest}>
      <Nav>
        <Selfie />
        <ResponsiveMenu />
      </Nav>
    </Wrapper>
  );
};

export default Header;
