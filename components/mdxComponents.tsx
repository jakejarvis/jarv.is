import dynamic from "next/dynamic";
import Link from "next/link";
import Image from "next/image";

import type { LinkProps } from "next/link";
import type { ImageProps } from "next/image";

// The following components are all passed into <MDXComponent /> in [slug].tsx as replacements for vanilla HTML tags.

type CustomLinkProps = LinkProps & {
  target?: string;
  rel?: string;
  className?: string;
  children?: unknown;
};
const CustomLink = ({ href, target, rel, className, children }: CustomLinkProps) => (
  <Link href={href} passHref={true}>
    <a className={className} target={target} rel={rel}>
      {children}
    </a>
  </Link>
);

type CustomImgProps = ImageProps & {
  caption?: unknown;
};
const CustomImg = (props: CustomImgProps) => (
  // the required height and width are part of the props, so they get automatically passed here with {...props}
  <div className={props.className}>
    {/* eslint-disable-next-line jsx-a11y/alt-text */}
    <Image {...props} />
  </div>
);

const CustomCode = (props: any) => {
  if (props.className?.split(" ").includes("hljs")) {
    const CopyButton = dynamic(() => import("./clipboard/CopyButton"));

    // full multi-line code blocks with highlight.js and copy-to-clipboard button
    return (
      <div>
        <CopyButton source={props.children} />
        <code {...props}>{props.children}</code>
        <style jsx>{`
          div {
            position: relative;
            max-width: 100%;
            overflow-x: scroll;
            margin: 1em 0;
          }
        `}</style>
      </div>
    );
  } else {
    // inline code in paragraphs, headings, etc. (not highlighted)
    return <code {...props}>{props.children}</code>;
  }
};

// These are the actual tags referenced in mdx files:
const mdxComponents = {
  a: CustomLink,
  img: CustomImg,
  code: CustomCode,
};

export default mdxComponents;
