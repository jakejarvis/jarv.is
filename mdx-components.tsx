import NextImage from "next/image";
import Link from "@/components/link";
import CopyButton from "@/components/copy-button";
import reactToText from "react-to-text";
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
    pre: ({ className, children, ...props }: React.ComponentProps<"pre">) => {
      return (
        <pre
          className={cn(
            "no-scrollbar min-w-0 overflow-x-auto overflow-y-auto overscroll-x-contain overscroll-y-auto px-4 py-3.5 outline-none has-[[data-highlighted-line]]:px-0",
            className
          )}
          {...props}
        >
          {children}
        </pre>
      );
    },
    code: ({ className, ...props }: React.ComponentProps<"code">) => {
      // Inline Code.
      if (typeof props.children === "string") {
        return (
          <code
            className={cn(
              "bg-muted relative rounded-md px-[0.3rem] py-[0.2rem] font-mono text-[0.8rem] break-words outline-none",
              className
            )}
            {...props}
          />
        );
      }

      // Default codeblock.
      return (
        <>
          <CopyButton value={reactToText(props.children)} />
          <code {...props} />
        </>
      );
    },

    // react components and embeds:
    Video,
    ImageDiff,
    Tweet,
    YouTube,
    Gist,
    CodePen,
  };
};
