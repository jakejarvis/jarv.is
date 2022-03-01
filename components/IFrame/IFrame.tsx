import type { Ref } from "react";
import { styled } from "../../stitches.config";

const StyledIFrame = styled("iframe", {
  width: "100%",
  display: "block",
  margin: "1em auto",
  border: "2px solid $kindaLight",
  borderRadius: "$rounded",
});

export type IFrameProps = JSX.IntrinsicElements["iframe"] & {
  src: string;
  height: number;
  width?: number; // defaults to 100%
  allowScripts?: boolean;
  noScroll?: boolean;
  // LegacyRef bug fix:
  ref?: Ref<HTMLIFrameElement>;
};

const IFrame = ({ src, title, height, width, allowScripts, noScroll, className, ...rest }: IFrameProps) => (
  <StyledIFrame
    className={className}
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
