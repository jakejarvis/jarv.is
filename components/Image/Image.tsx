import NextImage from "next/future/image";
import Link from "../Link";
import { styled, theme } from "../../lib/styles/stitches.config";
import type { ComponentProps } from "react";
import type { ImageProps as NextImageProps, StaticImageData } from "next/future/image";

const Block = styled("div", {
  display: "block",
  lineHeight: 0,

  // default to centering all images
  margin: "1em auto",
  textAlign: "center",
});

const StyledImage = styled(NextImage, {
  height: "auto",
  maxWidth: "100%",
  borderRadius: theme.radii.corner,
});

export type ImageProps = ComponentProps<typeof StyledImage> & {
  href?: string; // optionally wrap image in a link
  inline?: boolean; // don't wrap everything in a `<div>` block
};

const Image = ({ src, width, height, quality = 60, placeholder, href, inline, ...rest }: ImageProps) => {
  const imageProps: NextImageProps = {
    // strip "px" from dimensions: https://stackoverflow.com/a/4860249/1438024
    width: typeof width === "string" ? Number.parseInt(width, 10) : width,
    height: typeof height === "string" ? Number.parseInt(height, 10) : height,
    quality,
    src,
    placeholder,
    ...rest,
  };

  if (typeof src === "object" && (src as StaticImageData).src !== undefined) {
    const staticImg = src as StaticImageData;

    // all data for statically imported images is extracted from the object itself.
    imageProps.src = staticImg;
    // default to blur placeholder while loading if it's been generated for us.
    imageProps.placeholder = placeholder || (staticImg.blurDataURL !== undefined ? "blur" : "empty");
  } else if (typeof src === "string") {
    // regular path to a file was passed in, which makes explicit width and height required.
    // https://nextjs.org/docs/api-reference/next/future/image#width
    if (!(width && height)) {
      throw new Error("'width' and 'height' are required for non-statically imported images.");
    }

    // optionally prepending src with "/public" makes images resolve properly in GitHub markdown previews, etc.
    imageProps.src = src.replace(/^\/public/g, "");
  } else {
    throw new TypeError("'src' should be a string or a valid StaticImageData object.");
  }

  const StyledImageWithProps = href ? (
    <Link href={href} underline={false}>
      <StyledImage {...imageProps} />
    </Link>
  ) : (
    <StyledImage {...imageProps} />
  );

  return inline ? StyledImageWithProps : <Block>{StyledImageWithProps}</Block>;
};

export default Image;
