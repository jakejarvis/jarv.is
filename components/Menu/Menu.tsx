import { useRouter } from "next/router";
import MenuItem from "../MenuItem";
import ThemeToggle from "../ThemeToggle";
import { styled } from "../../lib/styles/stitches.config";
import { menuItems } from "../../lib/config/menu";
import type { ComponentProps } from "react";

const Wrapper = styled("ul", {
  display: "inline-flex",
  padding: 0,
  margin: 0,

  "@medium": {
    width: "100%",
    justifyContent: "space-between",
    marginLeft: "1em",
  },

  "@small": {
    marginLeft: "1.4em",
  },
});

const Item = styled("li", {
  display: "inline-block",
  marginLeft: "1em",
  listStyle: "none",

  "@medium": {
    marginLeft: 0,
  },

  "@small": {
    // the home icon is kinda redundant when space is SUPER tight
    "&:first-of-type": {
      display: "none",
    },
  },
});

export type MenuProps = ComponentProps<typeof Wrapper>;

const Menu = ({ ...rest }: MenuProps) => {
  const router = useRouter();

  return (
    <Wrapper {...rest}>
      {menuItems.map((item, index) => {
        // kinda weird/hacky way to determine if the *first part* of the current path matches this href
        const isCurrent = item.href === `/${router.pathname.split("/")[1]}`;

        return (
          <Item key={index}>
            <MenuItem {...item} current={isCurrent} />
          </Item>
        );
      })}

      <Item>
        <MenuItem icon={ThemeToggle} />
      </Item>
    </Wrapper>
  );
};

export default Menu;
