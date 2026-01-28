import NextImage from "next/image";
import Link from "@/components/link";
import CodeBlock from "@/components/code-block";
import Video from "@/components/video";
import ImageDiff from "@/components/image-diff";
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
    pre: CodeBlock,
    img: ({ src, className, ...rest }) => (
      <NextImage
        src={src}
        width={typeof src === "object" && "width" in src && src.width > 896 ? 896 : undefined} // => var(--container-4xl)
        className={cn(
          "mx-auto my-8 block h-auto max-w-full rounded-sm",
          "[&+em]:text-muted-foreground [&+em]:-mt-4 [&+em]:block [&+em]:text-center [&+em]:text-[0.875em] [&+em]:leading-normal [&+em]:font-medium [&+em]:not-italic",
          className
        )}
        {...rest}
      />
    ),

    // React components and embeds:
    Video,
    ImageDiff,
    Tweet,
    YouTube,
    Gist,
    CodePen,
  };
};
