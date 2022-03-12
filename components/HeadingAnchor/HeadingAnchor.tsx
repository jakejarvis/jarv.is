import { styled } from "../../lib/styles/stitches.config";
import type { ComponentProps } from "react";

const PoundSignLink = styled("a", {
  textDecoration: "none",

  "&::before": {
    // pound sign `#`, done here to keep content DOM cleaner
    content: "\\0023",
  },
});

export type HeadingAnchorProps = ComponentProps<typeof PoundSignLink> & {
  id: string;
  title: string;
};

const HeadingAnchor = ({ id, title, ...rest }: HeadingAnchorProps) => (
  <PoundSignLink href={`#${id}`} title={`Jump to "${title}"`} tabIndex={-1} aria-hidden={true} {...rest} />
);

export default HeadingAnchor;
