import NextImage from "next/image";
import Link from "../Link";
import { styled } from "../../lib/styles/stitches.config";
import type { ComponentProps } from "react";
import type { ImageProps as NextImageProps, StaticImageData } from "next/image";

// https://nextjs.org/docs/api-reference/next/image#optional-props
const DEFAULT_QUALITY = 60;
const DEFAULT_LAYOUT = "intrinsic";

const Wrapper = styled("div", {
  lineHeight: 0,

  // default to centering all images
  margin: "1em auto",
  textAlign: "center",
});

const RoundedImage = styled(NextImage, {
  borderRadius: "$rounded",
});

export type ImageProps = NextImageProps &
  ComponentProps<typeof RoundedImage> & {
    href?: string; // optionally wrap image in a link
  };

const Image = ({
  src,
  width,
  height,
  priority,
  alt = "",
  quality = DEFAULT_QUALITY,
  layout = DEFAULT_LAYOUT,
  placeholder,
  href,
  className,
  ...rest
}: ImageProps) => {
  const imageProps: Partial<NextImageProps> = {
    width: typeof width === "string" ? Number.parseInt(width.replace("px", "")) : width,
    height: typeof height === "string" ? Number.parseInt(height.replace("px", "")) : height,
    priority: !!priority,
    alt,
    quality,
    layout,
    placeholder,
  };

  if (typeof src === "object") {
    // static image imports: extract variables from the src object
    const staticImg = src as StaticImageData;

    imageProps.src = staticImg;
    // default to blur placeholder while loading if it's been generated for us
    imageProps.placeholder = placeholder || (staticImg.blurDataURL ? "blur" : "empty");
  } else {
    // regular path to a file was passed in, which makes explicit width and height required.
    // optionally prepending src with "/public" makes images resolve properly in GitHub markdown previews, etc.
    imageProps.src = (src as string).replace(/^\/public/g, "");
  }

  // @ts-ignore
  const img = <RoundedImage {...imageProps} {...rest} />;

  return (
    <Wrapper className={className}>
      {href ? (
        <Link href={href} underline={false}>
          {img}
        </Link>
      ) : (
        <>{img}</>
      )}
    </Wrapper>
  );
};

export default Image;
