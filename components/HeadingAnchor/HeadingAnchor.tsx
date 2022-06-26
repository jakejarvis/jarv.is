import Link from "../Link";
import { LinkIcon } from "../Icons";
import { styled } from "../../lib/styles/stitches.config";
import type { ComponentProps } from "react";

const AnchorLink = styled(Link, {
  lineHeight: 1,
});

const Icon = styled(LinkIcon, {
  width: "0.8em",
  height: "0.8em",
});

export type HeadingAnchorProps = Omit<ComponentProps<typeof AnchorLink>, "href"> & {
  id: string;
  title: string;
};

const HeadingAnchor = ({ id, title, ...rest }: HeadingAnchorProps) => {
  return (
    <AnchorLink href={`#${id}`} title={`Jump to "${title}"`} aria-hidden={true} underline={false} {...rest}>
      <Icon />
    </AnchorLink>
  );
};

export default HeadingAnchor;
