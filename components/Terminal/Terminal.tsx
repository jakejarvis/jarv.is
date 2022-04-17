import { keyframes, styled } from "../../lib/styles/stitches.config";
import type { ComponentProps } from "react";

const BlackBox = styled("div", {
  width: "100%",
  height: "100%",
  padding: "1.25em",
  backgroundColor: "#000000",
  color: "#cccccc",
});

const Monospace = styled("pre", {
  display: "inline",
  margin: 0,
  lineHeight: 1.75,
  fontSize: "0.925em",
  fontWeight: 500,
  whiteSpace: "pre-wrap",
  userSelect: "none",
});

// flashing terminal cursor underscore-looking thingy
const Underscore = styled("span", {
  display: "inline-block",
  verticalAlign: "text-bottom",
  width: "10px",
  marginLeft: "6px",
  borderBottom: "2px solid #cccccc",

  // blink every second for 0.4s
  animation: `${keyframes({ "40%": { opacity: 0 } })} 1s step-end infinite`,
});

export type TerminalProps = ComponentProps<typeof BlackBox>;

// a DOS-style terminal box with dynamic text
const Terminal = ({ children: message, ...rest }: TerminalProps) => {
  return (
    <BlackBox {...rest}>
      {message && <Monospace>{message}</Monospace>}
      <Underscore />
    </BlackBox>
  );
};

export default Terminal;
