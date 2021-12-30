import Link from "next/link";
import Image from "next/image";
import TweetEmbed from "react-tweet-embed";
import Gist from "react-gist";
import getNodeText from "../lib/getNodeText";
import Video from "./video/FullPageVideo";
import CopyButton from "./clipboard/CopyButton";
import { MarkGithubIcon } from "@primer/octicons-react";
import type { LinkProps } from "next/link";
import type { ImageProps } from "next/image";
import type { ReactPlayerProps } from "react-player";

// The following components are all passed into <MDXProvider /> as replacement HTML tags or drop-in React components
// available in .mdx files containing post content, since they're not directly aware of the components in this folder.
const mdxComponents = {
  a: ({
    href,
    target,
    rel,
    className,
    children,
  }: LinkProps & {
    target?: string;
    rel?: string;
    className?: string;
    children?: unknown;
  }) => (
    <Link href={href} passHref={true}>
      <a className={className} target={target} rel={rel}>
        {children}
      </a>
    </Link>
  ),
  img: (props: ImageProps) => {
    return (
      // height and width are part of the props, so they get automatically passed here with {...props}
      <div className={props.className}>
        {/* eslint-disable-next-line jsx-a11y/alt-text */}
        <Image {...props} />
      </div>
    );
  },
  code: (props: any) => {
    if (props.className?.split(" ").includes("hljs")) {
      return (
        <div>
          <CopyButton content={getNodeText(props.children)} />
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
      return <code {...props}>{props.children}</code>;
    }
  },
  video: (props: ReactPlayerProps) => <Video {...props} />,
  tweet: (props: { id: string }) => (
    <TweetEmbed
      id={props.id}
      options={{
        dnt: true,
        align: "center",
      }}
    />
  ),
  gist: (props: { id: string; file?: string }) => <Gist {...props} />,
  octocat: (props: { repo: string }) => (
    <a className="no-underline" href={`https://github.com/${props.repo}`} target="_blank" rel="noopener noreferrer">
      <MarkGithubIcon size={24} verticalAlign="text-top" />
      <style jsx>{`
        a {
          margin: 0 0.3em;
          color: var(--text);
        }

        a:hover {
          color: var(--link);
        }
      `}</style>
    </a>
  ),
};

export default mdxComponents;
