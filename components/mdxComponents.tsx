import dynamic from "next/dynamic";
import Link from "next/link";
import Image from "next/image";
import { useTheme } from "next-themes";

import type { LinkProps } from "next/link";
import type { ImageProps } from "next/image";

// The following components are all passed into <MDXProvider /> as replacement HTML tags or drop-in React components
// available in .mdx files containing post content, since they're not directly aware of the components in this folder.

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

const CustomImg = (props: ImageProps) => (
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

const CustomTweet = (props: { id: string }) => {
  const TweetEmbed = dynamic(() => import("react-tweet-embed"));
  const { resolvedTheme } = useTheme();

  return (
    <TweetEmbed
      id={props.id}
      options={{
        dnt: true,
        align: "center",
        theme: resolvedTheme === "dark" ? "dark" : "light",
      }}
    />
  );
};

const CustomGist = dynamic(() => import("react-gist"));

const CustomVideo = dynamic(() => import("./video/Video"));

const CustomGitHubLink = (props: { repo: string }) => {
  const OctocatOcticon: any = dynamic(() => import("./icons/octicons").then((mod) => mod.OctocatOcticon));

  return (
    <a className="no-underline" href={`https://github.com/${props.repo}`} target="_blank" rel="noopener noreferrer">
      <OctocatOcticon className="icon" fill="currentColor" />
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
};

// These are the actual tags referenced in mdx files:
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
