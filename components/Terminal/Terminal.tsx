import { forwardRef } from "react";
import classNames from "classnames";
import { keyframes, styled } from "../../lib/styles/stitches.config";
import type { Ref, ComponentProps } from "react";

const BlackBox = styled("div", {
  width: "100%",
  height: "100%",
  padding: "1em",

  backgroundColor: "#000000",
  color: "#cccccc",

  fontSize: "0.925em",
  fontWeight: 500,
  lineHeight: 2,
  whiteSpace: "pre-wrap",
  userSelect: "none",
});

const blink = keyframes({
  "40%": { opacity: 0 },
});

const Underscore = styled("span", {
  display: "inline-block",
  verticalAlign: "text-bottom",
  width: "10px",
  borderBottom: "2px solid #cccccc",
  animation: `${blink} 1s step-end infinite`,
});

export type TerminalProps = ComponentProps<typeof BlackBox>;

// a DOS-style terminal box with dynamic text
const Terminal = forwardRef(function Terminal({ className, ...rest }: TerminalProps, ref: Ref<HTMLSpanElement>) {
  return (
    <BlackBox className={classNames("monospace", className)} {...rest}>
      <span ref={ref} /> <Underscore />
    </BlackBox>
  );
});

export default Terminal;
