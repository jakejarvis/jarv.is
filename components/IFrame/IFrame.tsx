import { styled, theme } from "../../lib/styles/stitches.config";
import type { ComponentPropsWithoutRef } from "react";

const RoundedIFrame = styled("iframe", {
  width: "100%",
  display: "block",
  margin: "1em auto",
  border: `2px solid ${theme.colors.kindaLight}`,
  borderRadius: theme.radii.corner,
});

export type IFrameProps = ComponentPropsWithoutRef<typeof RoundedIFrame> & {
  src: string;
  height: number;
  width?: number; // defaults to 100%
  allowScripts?: boolean;
  noScroll?: boolean;
};

const IFrame = ({ src, title, height, width, allowScripts, noScroll, css, ...rest }: IFrameProps) => {
  return (
    <RoundedIFrame
      src={src}
      title={title}
      sandbox={allowScripts ? "allow-same-origin allow-scripts allow-popups" : undefined}
      scrolling={noScroll ? "no" : undefined}
      loading="lazy"
      css={{
        height: `${height}px`,
        maxWidth: width ? `${width}px` : "100%",
        ...css,
      }}
      {...rest}
    />
  );
};

export default IFrame;
