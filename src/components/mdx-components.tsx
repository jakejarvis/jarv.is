import { Link } from "@tanstack/react-router";
import type { MDXComponents } from "mdx/types";

import { CodeBlock } from "@/components/code-block";
import { Image } from "@/components/image";
import { ImageDiff } from "@/components/image-diff";
import { CodePen } from "@/components/third-party/codepen";
import { Gist } from "@/components/third-party/gist";
import { Tweet } from "@/components/third-party/tweet";
import { YouTube } from "@/components/third-party/youtube";
import { Video } from "@/components/video";
import { cn } from "@/lib/utils";

/** Widest an image is rendered in the content column. */
const MAX_IMAGE_WIDTH = 896;

/**
 * Passed to every MDX module as its `components` prop (see src/lib/content/render.server.tsx). These render as React
 * Server Components; the interactive ones (ImageDiff, YouTube, CopyButton inside CodeBlock) are client components.
 */
export const mdxComponents: MDXComponents = {
  a: ({ href, rel, target, children, ...rest }) => {
    if (typeof href === "string" && href.startsWith("/")) {
      return (
        <Link to={href} rel={rel} target={target} {...rest}>
          {children}
        </Link>
      );
    }
    if (typeof href === "string" && href.startsWith("#")) {
      return (
        <a href={href} rel={rel} target={target} {...rest}>
          {children}
        </a>
      );
    }
    return (
      <a href={href} rel={rel || "noopener noreferrer"} target={target || "_blank"} {...rest}>
        {children}
      </a>
    );
  },
  pre: CodeBlock,
  img: ({ src, alt, width, height, className, ...rest }) => {
    // intrinsic dimensions come from rehypeImageSize (src/lib/rehype-image-size.ts)
    const intrinsicWidth = Number(width);
    const intrinsicHeight = Number(height);
    if (typeof src !== "string" || !intrinsicWidth || !intrinsicHeight) {
      // oxlint-disable-next-line jsx-a11y/alt-text
      return (
        <img src={src} alt={alt} width={width} height={height} className={className} {...rest} />
      );
    }

    const renderedWidth = Math.min(intrinsicWidth, MAX_IMAGE_WIDTH);
    const renderedHeight = Math.round((intrinsicHeight / intrinsicWidth) * renderedWidth);

    return (
      <Image
        src={src}
        alt={alt ?? ""}
        width={renderedWidth}
        height={renderedHeight}
        className={cn(
          "mx-auto my-8 block h-auto max-w-full rounded-sm",
          "[&+em]:-mt-4 [&+em]:block [&+em]:text-center [&+em]:text-[0.875em] [&+em]:leading-normal [&+em]:font-medium [&+em]:text-muted-foreground [&+em]:not-italic",
          className,
        )}
        {...rest}
      />
    );
  },

  // React components and embeds:
  Video,
  ImageDiff,
  Tweet,
  YouTube,
  Gist,
  CodePen,
};
