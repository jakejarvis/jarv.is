import Link from "../Link";
import { LinkIcon } from "lucide-react";
import type { ComponentPropsWithoutRef } from "react";

export type HeadingAnchorProps = Omit<ComponentPropsWithoutRef<typeof Link>, "href" | "id"> & {
  id: string;
};

const HeadingAnchor = ({ id, ...rest }: HeadingAnchorProps) => {
  return (
    <Link href={`#${id}`} plain {...rest}>
      <LinkIcon size="0.8em" />
    </Link>
  );
};

export default HeadingAnchor;
