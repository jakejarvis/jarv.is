"use client";

import { Children, isValidElement } from "react";
import { ReactCompareSlider, ReactCompareSliderImage } from "react-compare-slider";

import { cn } from "@/lib/utils";

type ImageProps = Pick<React.ComponentProps<"img">, "src" | "srcSet" | "alt" | "width" | "height">;

/**
 * Before/after image slider. Its two children are the MDX `img` elements, already rendered (as server components)
 * into plain `<img>`s, so their optimized `src`/`srcSet` and intrinsic dimensions are read straight off their props.
 */
const ImageDiff = ({ children, className }: { children: React.ReactNode; className?: string }) => {
  const images = Children.toArray(children).filter(isValidElement<ImageProps>);
  if (images.length !== 2) {
    console.error("ImageDiff must have exactly two children (before and after images)");
    return null;
  }

  const [before, after] = images.map(({ props: { src, srcSet, alt } }) => ({ src, srcSet, alt }));

  const { width, height } = images[0].props;
  const aspectRatio = width && height ? Number(width) / Number(height) : 16 / 9;

  return (
    <ReactCompareSlider
      className={cn("my-8 w-full max-w-full overflow-hidden rounded-sm", className)}
      style={{ aspectRatio }}
      itemOne={<ReactCompareSliderImage {...before} className="size-full object-cover" />}
      itemTwo={<ReactCompareSliderImage {...after} className="size-full object-cover" />}
      suppressHydrationWarning
    />
  );
};

export { ImageDiff };
