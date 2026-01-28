import Image from "next/image";
import Link from "next/link";
import { CodeBlock } from "@/components/code-block";
import { Video } from "@/components/video";
import { ImageDiff } from "@/components/image-diff";
import { Tweet } from "@/components/third-party/tweet";
import { YouTube } from "@/components/third-party/youtube";
import { Gist } from "@/components/third-party/gist";
import { CodePen } from "@/components/third-party/codepen";
import { cn } from "@/lib/utils";
import type { MDXComponents } from "mdx/types";

export const useMDXComponents = (components: MDXComponents): MDXComponents => {
  return {
    ...components,
    a: ({ href, rel, target, ...rest }: React.ComponentProps<typeof Link>) => {
      const isExternal = typeof href === "string" && !["/", "#"].includes(href[0]);
      if (isExternal) {
        return <a href={href} rel={rel || "noopener noreferrer"} target={target || "_blank"} {...rest} />;
      }
      return <Link href={href} rel={rel} target={target} {...rest} />;
    },
    pre: CodeBlock,
    img: ({ src, alt, className, ...rest }: React.ComponentProps<typeof Image>) => {
      const imageWidth = typeof src === "object" && "width" in src && src.width > 896 ? 896 : undefined;
      const imageHeight =
        imageWidth && typeof src === "object" && "width" in src && "height" in src
          ? Math.round((src.height / src.width) * imageWidth)
          : undefined;

      return (
        <Image
          src={src}
          alt={alt}
          width={imageWidth}
          height={imageHeight}
          className={cn(
            "mx-auto my-8 block h-auto max-w-full rounded-sm",
            "[&+em]:text-muted-foreground [&+em]:-mt-4 [&+em]:block [&+em]:text-center [&+em]:text-[0.875em] [&+em]:leading-normal [&+em]:font-medium [&+em]:not-italic",
            className
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
};
