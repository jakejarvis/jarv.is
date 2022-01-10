import Link from "next/link";
import type { LinkProps } from "next/link";

type CustomLinkProps = LinkProps & {
  target?: string;
  rel?: string;
  className?: string;
  children?: unknown;
  rest?: unknown;
};

const CustomLink = ({ href, target, rel, className, children, ...rest }: CustomLinkProps) => (
  <Link href={href} passHref={true}>
    <a className={className} target={target} rel={rel} {...rest}>
      {children}
    </a>
  </Link>
);

export default CustomLink;
