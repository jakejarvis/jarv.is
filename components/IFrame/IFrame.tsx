import { styled } from "../../lib/styles/stitches.config";
import type { ComponentProps } from "react";

const RoundedIFrame = styled("iframe", {
  width: "100%",
  display: "block",
  margin: "1em auto",
  border: "2px solid $kindaLight",
  borderRadius: "$rounded",
});

export type IFrameProps = ComponentProps<typeof RoundedIFrame> & {
  src: string;
  height: number;
  width?: number; // defaults to 100%
  allowScripts?: boolean;
  noScroll?: boolean;
};

const IFrame = ({ src, title, height, width, allowScripts, noScroll, ...rest }: IFrameProps) => (
  <RoundedIFrame
    src={src}
    title={title}
    sandbox={allowScripts ? "allow-same-origin allow-scripts allow-popups" : undefined}
    scrolling={noScroll ? "no" : undefined}
    loading="lazy"
    css={{
      height: `${height}px`,
      maxWidth: width ? `${width}px` : null,
    }}
    {...rest}
  />
);

export default IFrame;
