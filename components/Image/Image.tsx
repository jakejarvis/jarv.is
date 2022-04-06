import NextImage from "next/image";
import Link from "../Link";
import { styled } from "../../lib/styles/stitches.config";
import type { ComponentProps } from "react";
import type { ImageProps as NextImageProps, StaticImageData } from "next/image";

const Wrapper = styled("div", {
  lineHeight: 0,

  // default to centering all images
  margin: "1em auto",
  textAlign: "center",
});

const RoundedImage = styled(NextImage, {
  borderRadius: "$rounded",
});

export type CustomImageProps = NextImageProps &
  ComponentProps<typeof RoundedImage> & {
    href?: string; // optionally wrap image in a link
  };

const CustomImage = ({
  src,
  width,
  height,
  placeholder,
  alt,
  layout,
  quality,
  priority,
  href,
  className,
  ...rest
}: CustomImageProps) => {
  // passed directly into next/image: https://nextjs.org/docs/api-reference/next/image
  const imageProps: Partial<NextImageProps> = {
    width: typeof width === "string" ? Number.parseInt(width.replace("px", "")) : width,
    height: typeof height === "string" ? Number.parseInt(height.replace("px", "")) : height,
    alt: alt || "",
    layout: layout || "intrinsic",
    quality: quality || 65,
    priority: !!priority,
    loading: priority ? "eager" : "lazy",
  };

  if (typeof src === "object") {
    // static image imports: extract variables from the src object
    const staticImg = src as StaticImageData;

    imageProps.src = staticImg;
    // default to blur placeholder while loading
    imageProps.placeholder = placeholder || (staticImg.blurDataURL ? "blur" : "empty");
  } else {
    // regular path to jpg/png/etc. passed in, which makes explicit width and height required
    imageProps.src = (src as string).replace(/^\/public/g, "");
  }

  // @ts-ignore
  const img = <RoundedImage {...imageProps} {...rest} />;

  return (
    <Wrapper className={className}>
      {href ? (
        <Link href={href} fancy={false}>
          {img}
        </Link>
      ) : (
        img
      )}
    </Wrapper>
  );
};

export default CustomImage;
