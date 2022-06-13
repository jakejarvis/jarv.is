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

export type ImageProps = ComponentProps<typeof RoundedImage> & {
  href?: string; // optionally wrap image in a link
};

const Image = ({
  src,
  width,
  height,
  quality = DEFAULT_QUALITY,
  layout = DEFAULT_LAYOUT,
  placeholder,
  href,
  ...rest
}: ImageProps) => {
  const imageProps: Partial<NextImageProps> = {
    // strip "px" from dimensions: https://stackoverflow.com/a/4860249/1438024
    width: typeof width === "string" ? Number.parseInt(width, 10) : width,
    height: typeof height === "string" ? Number.parseInt(height, 10) : height,
    quality,
    layout,
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
    // https://nextjs.org/docs/api-reference/next/image#width
    if (layout !== "fill" && (!width || !height)) {
      throw new Error("'width' and 'height' are required for non-statically imported images.");
    }

    // optionally prepending src with "/public" makes images resolve properly in GitHub markdown previews, etc.
    imageProps.src = src.replace(/^\/public/g, "");
  } else {
    throw new TypeError("'src' should be a string or a valid StaticImageData object.");
  }

  // @ts-ignore
  const img = <RoundedImage {...imageProps} />;

  return (
    <Wrapper>
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
