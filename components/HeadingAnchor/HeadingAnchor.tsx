import { LinkIcon } from "../Icons";
import { styled } from "../../lib/styles/stitches.config";
import type { ComponentProps } from "react";

const AnchorLink = styled("a", {
  textDecoration: "none",
  lineHeight: 1,
});

const Icon = styled(LinkIcon, {
  width: "0.8em",
  height: "0.8em",
});

export type HeadingAnchorProps = ComponentProps<typeof AnchorLink> & {
  id: string;
  title: string;
};

const HeadingAnchor = ({ id, title, ...rest }: HeadingAnchorProps) => {
  return (
    <AnchorLink href={`#${id}`} title={`Jump to "${title}"`} aria-hidden={true} {...rest}>
      <Icon />
    </AnchorLink>
  );
};

export default HeadingAnchor;
