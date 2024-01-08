import Link from "../Link";
import { styled, theme } from "../../lib/styles/stitches.config";
import type { IconType } from "react-icons";

const MenuLink = styled(Link, {
  display: "inline-block",
  color: theme.colors.mediumDark,
  padding: "0.6em",

  variants: {
    // indicate active page/section
    current: {
      true: {
        marginBottom: "-0.2em",
        borderBottom: `0.2em solid ${theme.colors.linkUnderline}`,
      },
      false: {
        "&:hover, &:focus-visible": {
          marginBottom: "-0.2em",
          borderBottom: `0.2em solid ${theme.colors.kindaLight}`,
        },
      },
    },
  },
});

const Icon = styled("svg", {
  width: "1.25em",
  height: "1.25em",
  verticalAlign: "-0.3em",

  "@medium": {
    width: "1.8em",
    height: "1.8em",
  },
});

const Label = styled("span", {
  fontSize: "0.925em",
  fontWeight: 500,
  letterSpacing: "0.02em",
  marginLeft: "0.7em",

  "@medium": {
    display: "none",
  },
});

export type MenuItemProps = {
  icon?: IconType;
  text?: string;
  href?: string;
  current?: boolean;
  className?: string;
};

const MenuItem = ({ icon, text, href, current, className }: MenuItemProps) => {
  const item = (
    <>
      {icon && <Icon as={icon} />}
      {text && <Label>{text}</Label>}
    </>
  );

  // allow both navigational links and/or other interactive react components (e.g. the theme toggle)
  if (href) {
    return (
      <MenuLink href={href} className={className} current={current} title={text} underline={false} aria-label={text}>
        {item}
      </MenuLink>
    );
  }

  return item;
};

export default MenuItem;
