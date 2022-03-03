import { memo } from "react";
import { useRouter } from "next/router";
import MenuItem from "../MenuItem/MenuItem";
import { styled } from "../../lib/styles/stitches.config";
import { menuItems } from "../../lib/config/menu";
import type { ComponentProps } from "react";

const Wrapper = styled("ul", {
  display: "inline-flex",
  padding: 0,
  margin: 0,

  "@mobile": {
    width: "100%",
    justifyContent: "space-between",
    marginLeft: "1em",
  },

  "@superNarrow": {
    marginLeft: "1.4em",
  },
});

const Item = styled("li", {
  listStyle: "none",
  display: "inline-flex",
  marginLeft: "1em",

  "@mobile": {
    marginLeft: 0,
  },

  "@superNarrow": {
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
      {menuItems.map((item, index) => (
        <Item key={index}>
          {/* kinda weird/hacky way to determine if the *first part* of the current path matches this href */}
          <MenuItem {...item} current={item.href === `/${router.pathname.split("/")[1]}`} />
        </Item>
      ))}
    </Wrapper>
  );
};

export default memo(Menu);
