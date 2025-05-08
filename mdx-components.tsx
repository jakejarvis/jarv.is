import NextImage from "next/image";
import Link from "@/components/link";
import CodeBlock from "@/components/code-block";
import HeadingAnchor from "@/components/heading-anchor";
import Video from "@/components/video";
import ImageDiff from "./components/image-diff";
import Tweet from "@/components/third-party/tweet";
import YouTube from "@/components/third-party/youtube";
import Gist from "@/components/third-party/gist";
import CodePen from "@/components/third-party/codepen";

import { cn } from "@/lib/utils";

import type { MDXComponents } from "mdx/types";

export const useMDXComponents = (components: MDXComponents): MDXComponents => {
  return {
    ...components,
    a: Link,
    pre: ({ className, ...rest }) => <CodeBlock className={cn("my-5 w-full font-mono text-sm", className)} {...rest} />,
    code: ({ className, ...rest }) => (
      // only applies to inline code, *not* highlighted code blocks!
      <code
        className={cn("bg-muted relative rounded-sm px-[0.3rem] py-[0.2rem] text-sm font-medium", className)}
        {...rest}
      />
    ),
    img: ({ src, className, ...rest }) => (
      <NextImage
        src={src}
        width={typeof src === "object" && "width" in src && src.width > 896 ? 896 : undefined} // => var(--container-4xl)
        className={cn(
          "mx-auto my-8 block h-auto max-w-full rounded-md",
          "[&+em]:text-muted-foreground [&+em]:-mt-4 [&+em]:block [&+em]:text-center [&+em]:text-[0.875em] [&+em]:leading-normal [&+em]:font-medium [&+em]:not-italic",
          className
        )}
        {...rest}
      />
    ),
    figure: ({ className, ...rest }) => <figure className={cn("my-8 *:my-0", className)} {...rest} />,
    figcaption: ({ className, ...rest }) => (
      <figcaption className={cn("text-muted-foreground mt-3.5 text-[0.875em] leading-snug", className)} {...rest} />
    ),
    blockquote: ({ className, ...rest }) => (
      <blockquote className={cn("text-muted-foreground mt-6 border-l-4 pl-4", className)} {...rest} />
    ),
    h1: ({ className, id, children, ...rest }) => (
      <h1
        className={cn(
          "group mt-6 mb-4 scroll-mt-4 text-3xl leading-snug font-extrabold md:text-4xl [&_strong]:font-black [&+*]:mt-0",
          className
        )}
        id={id}
        tabIndex={-1}
        {...rest}
      >
        {children}
        {id && <HeadingAnchor id={id} title={children} className="opacity-0 group-hover:opacity-100 max-md:hidden" />}
      </h1>
    ),
    h2: ({ className, id, children, ...rest }) => (
      <h2
        className={cn(
          "group mt-6 mb-4 scroll-mt-4 text-xl leading-snug font-bold first:mt-0 md:text-2xl [&_code]:text-[0.875em] [&_strong]:font-extrabold [&+*]:mt-0",
          className
        )}
        id={id}
        tabIndex={-1}
        {...rest}
      >
        {children}
        {id && <HeadingAnchor id={id} title={children} className="opacity-0 group-hover:opacity-100 max-md:hidden" />}
      </h2>
    ),
    h3: ({ className, id, children, ...rest }) => (
      <h3
        className={cn(
          "group mt-6 mb-4 scroll-mt-4 text-lg leading-relaxed font-semibold md:text-xl [&_code]:text-[0.9em] [&_strong]:font-bold [&+*]:mt-0",
          className
        )}
        id={id}
        tabIndex={-1}
        {...rest}
      >
        {children}
        {id && <HeadingAnchor id={id} title={children} className="opacity-0 group-hover:opacity-100 max-md:hidden" />}
      </h3>
    ),
    h4: ({ className, ...rest }) => (
      <h4
        className={cn(
          "mt-6 mb-2 scroll-mt-4 text-base leading-normal font-semibold [&_strong]:font-bold [&+*]:mt-0",
          className
        )}
        {...rest}
      />
    ),
    h5: ({ className, ...rest }) => (
      <h5 className={cn("mt-6 mb-2 scroll-mt-4 text-base leading-normal font-medium", className)} {...rest} />
    ),
    h6: ({ className, ...rest }) => (
      <h6 className={cn("mt-6 mb-2 scroll-mt-4 text-sm leading-normal font-normal", className)} {...rest} />
    ),
    ul: ({ className, ...rest }) => <ul className={cn("my-5 list-disc pl-7 [&>li]:pl-1.5", className)} {...rest} />,
    ol: ({ className, ...rest }) => <ol className={cn("my-5 list-decimal pl-7 [&>li]:pl-1.5", className)} {...rest} />,
    li: ({ className, ...rest }) => (
      <li
        className={cn(
          "[&::marker]:text-muted-foreground my-0.5 [&::marker]:font-normal [&>ol]:my-1 [&>ul]:my-1",
          className
        )}
        {...rest}
      />
    ),
    hr: ({ className, ...rest }) => (
      <hr className={cn("mx-auto my-6 w-11/12 border-t-2 [&+*]:mt-0", className)} {...rest} />
    ),

    // react components and embeds:
    Video,
    ImageDiff,
    Tweet,
    YouTube,
    Gist,
    CodePen,
  };
};
