"use client";

import { Children } from "react";
import { getImageProps } from "next/image";
import { ReactCompareSlider, ReactCompareSliderImage } from "react-compare-slider";
import { cn } from "@/lib/utils";

const ImageDiff = ({ children, className }: { children: React.ReactElement[]; className?: string }) => {
  // Extract the two image children
  const childrenArray = Children.toArray(children);
  if (childrenArray.length !== 2) {
    console.error("ImageDiff must have exactly two children (before and after images)");
    return null;
  }

  // Get the original image source to extract dimensions for aspect ratio
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const firstChildProps = children[0].props as any;
  const imageSrc = firstChildProps.src;
  const aspectRatio =
    typeof imageSrc === "object" && "width" in imageSrc && "height" in imageSrc
      ? imageSrc.width / imageSrc.height
      : 16 / 9;

  // Extract image props, stripping out MDX className (margins, etc.) that would break slider layout
  const beforeImageProps = getImageProps(firstChildProps).props;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const afterImageProps = getImageProps(children[1].props as any).props;

  return (
    <ReactCompareSlider
      className={cn("my-8 w-full max-w-full overflow-hidden rounded-sm", className)}
      style={{ aspectRatio }}
      itemOne={<ReactCompareSliderImage {...beforeImageProps} className="size-full object-cover" />}
      itemTwo={<ReactCompareSliderImage {...afterImageProps} className="size-full object-cover" />}
    />
  );
};

export { ImageDiff };
