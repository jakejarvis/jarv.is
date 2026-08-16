"use client";

import { getImageProps } from "next/image";
import { Children } from "react";
import { ReactCompareSlider, ReactCompareSliderImage } from "react-compare-slider";

import { cn } from "@/lib/utils";

type ImageChildProps = Parameters<typeof getImageProps>[0];

const ImageDiff = ({
  children,
  className,
}: {
  children: React.ReactElement<ImageChildProps>[];
  className?: string;
}) => {
  // Extract the two image children
  const childrenArray = Children.toArray(children);
  if (childrenArray.length !== 2) {
    console.error("ImageDiff must have exactly two children (before and after images)");
    return null;
  }

  const [before, after] = children;

  // Get the original image source to extract dimensions for aspect ratio
  const imageSrc = before.props.src;
  const aspectRatio =
    typeof imageSrc === "object" && "width" in imageSrc && "height" in imageSrc
      ? imageSrc.width / imageSrc.height
      : 16 / 9;

  // Extract image props, stripping out MDX className (margins, etc.) that would break slider layout
  const beforeImageProps = getImageProps(before.props).props;
  const afterImageProps = getImageProps(after.props).props;

  return (
    <ReactCompareSlider
      className={cn("my-8 w-full max-w-full overflow-hidden rounded-sm", className)}
      style={{ aspectRatio }}
      itemOne={<ReactCompareSliderImage {...beforeImageProps} className="size-full object-cover" />}
      itemTwo={<ReactCompareSliderImage {...afterImageProps} className="size-full object-cover" />}
      suppressHydrationWarning
    />
  );
};

export { ImageDiff };
