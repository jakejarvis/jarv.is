import { styled, css } from "../../lib/styles/stitches.config";

const ListStyles = css({
  marginLeft: "1.5em",
  paddingLeft: 0,
});

export const UnorderedList = styled("ul", ListStyles);
export const OrderedList = styled("ol", ListStyles);

// TODO: this is based on good faith that the children are all `<li>`s...
export const ListItem = styled("li", {
  paddingLeft: "0.25em",
});
