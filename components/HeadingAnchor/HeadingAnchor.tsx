import Link from "../Link";
import { LinkIcon } from "lucide-react";
import type { ComponentPropsWithoutRef } from "react";

export type HeadingAnchorProps = Omit<ComponentPropsWithoutRef<typeof Link>, "href"> & {
  id: string;
  title: string;
};

const HeadingAnchor = ({ id, title, ...rest }: HeadingAnchorProps) => {
  return (
    <Link href={`#${id}`} title={`Jump to "${title}"`} plain {...rest}>
      <LinkIcon size="0.8em" />
    </Link>
  );
};

export default HeadingAnchor;
