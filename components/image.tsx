import NextImage from "next/image";
import { MAX_WIDTH } from "@/lib/config/constants";
import { cn } from "@/lib/utils";
import type { ComponentPropsWithoutRef } from "react";
import type { StaticImageData } from "next/image";

export type ImageProps = ComponentPropsWithoutRef<typeof NextImage>;

const Image = ({ src, height, width, placeholder, className, ...rest }: ImageProps) => {
  // ensure that the image width is not greater than the global maximum width
  const constrainWidth = (width?: number | `${number}`) => {
    return width ? Math.min(typeof width === "string" ? parseInt(width, 10) : width, MAX_WIDTH) : MAX_WIDTH;
  };

  return (
    <NextImage
      src={src}
      height={height}
      width={constrainWidth(width || (src as StaticImageData).width)}
      placeholder={placeholder || (typeof src === "object" && "blurDataURL" in src ? "blur" : "empty")}
      className={cn("mx-auto block h-auto max-w-full", className)}
      {...rest}
    />
  );
};

export default Image;
