import Link from "../Link";
import { FiLink } from "react-icons/fi";
import type { ComponentPropsWithoutRef } from "react";

export type HeadingAnchorProps = Omit<ComponentPropsWithoutRef<typeof Link>, "href"> & {
  id: string;
  title: string;
};

const HeadingAnchor = ({ id, title, ...rest }: HeadingAnchorProps) => {
  return (
    <Link href={`#${id}`} title={`Jump to "${title}"`} aria-hidden underline={false} css={{ lineHeight: 1 }} {...rest}>
      <FiLink size="0.8em" />
    </Link>
  );
};

export default HeadingAnchor;
