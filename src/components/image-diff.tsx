"use client";

import { Children } from "react";
import { ReactCompareSlider, ReactCompareSliderImage } from "react-compare-slider";

import { cn } from "@/lib/utils";

const ImageDiff = ({
  children,
  className,
}: {
  children: React.ReactElement[];
  className?: string;
}) => {
  const childrenArray = Children.toArray(children);
  if (childrenArray.length !== 2) {
    console.error("ImageDiff must have exactly two children (before and after images)");
    return null;
  }

  const firstChildProps = children[0].props as {
    src: string | { width: number; height: number; src: string };
    alt?: string;
  };
  const secondChildProps = children[1].props as {
    src: string | { width: number; height: number; src: string };
    alt?: string;
  };

  const imageSrc = firstChildProps.src;
  const aspectRatio =
    typeof imageSrc === "object" && "width" in imageSrc && "height" in imageSrc
      ? imageSrc.width / imageSrc.height
      : 16 / 9;

  const getSrc = (src: string | { src: string }): string =>
    typeof src === "object" ? src.src : src;

  return (
    <ReactCompareSlider
      className={cn("my-8 w-full max-w-full overflow-hidden rounded-sm", className)}
      style={{ aspectRatio }}
      itemOne={
        <ReactCompareSliderImage
          src={getSrc(firstChildProps.src)}
          alt={firstChildProps.alt || "Before"}
          className="size-full object-cover"
        />
      }
      itemTwo={
        <ReactCompareSliderImage
          src={getSrc(secondChildProps.src)}
          alt={secondChildProps.alt || "After"}
          className="size-full object-cover"
        />
      }
    />
  );
};

export { ImageDiff };
