import dynamic from "next/dynamic";
import Link from "next/link";
import Image from "next/image";
import getNodeText from "../lib/get-node-text";
import { OctocatOcticon } from "./icons/octicons";

import type { LinkProps } from "next/link";
import type { ImageProps } from "next/image";
import type { GistProps } from "react-gist";
import type { ReactPlayerProps } from "react-player";

const TweetEmbed = dynamic(() => import("react-tweet-embed"));
const Gist = dynamic(() => import("react-gist"));
const Video = dynamic(() => import("./video/FullPageVideo"));
const CopyButton = dynamic(() => import("./clipboard/CopyButton"));

// The following components are all passed into <MDXProvider /> as replacement HTML tags or drop-in React components
// available in .mdx files containing post content, since they're not directly aware of the components in this folder.

const CustomLink = ({
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
);

const CustomImg = (props: ImageProps) => {
  return (
    // height and width are part of the props, so they get automatically passed here with {...props}
    <div className={props.className}>
      {/* eslint-disable-next-line jsx-a11y/alt-text */}
      <Image {...props} />
    </div>
  );
};

const CustomCode = (props: any) => {
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
};

const CustomVideo = (props: ReactPlayerProps) => <Video {...props} />;

const CustomTweet = (props: { id: string }) => (
  <TweetEmbed
    id={props.id}
    options={{
      dnt: true,
      align: "center",
    }}
  />
);

const CustomGist = (props: GistProps) => <Gist {...props} />;

const CustomGitHubLink = (props: { repo: string }) => (
  <a className="no-underline" href={`https://github.com/${props.repo}`} target="_blank" rel="noopener noreferrer">
    <OctocatOcticon fill="currentColor" />
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
);

const mdxComponents = {
  a: CustomLink,
  img: CustomImg,
  code: CustomCode,
  video: CustomVideo,
  tweet: CustomTweet,
  gist: CustomGist,
  octocat: CustomGitHubLink,
};

export default mdxComponents;
