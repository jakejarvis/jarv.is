import Code from "../Code";
import CopyButton from "../CopyButton";
import { styled } from "../../lib/styles/stitches.config";
import type { ComponentProps } from "react";

const Block = styled("div", {
  position: "relative",
  width: "100%",
  margin: "1em auto",
  color: "$codeText",

  [`& ${Code}`]: {
    display: "block",
    overflowX: "auto",
    padding: "1em",
    tabSize: 2,

    // optional line numbers added at time of prism compilation
    ".line-number::before": {
      display: "inline-block",
      width: "1.5em",
      marginRight: "1.5em",
      textAlign: "right",
      color: "$codeComment",
      content: "attr(line)", // added as spans by prism
      fontVariantNumeric: "tabular-nums",
      userSelect: "none",
    },

    // leave room for clipboard button to the right of the first line
    ".code-line:first-of-type": {
      marginRight: "3em",
    },
  },

  variants: {
    highlight: {
      true: {
        // the following sub-classes MUST be global -- the prism rehype plugin isn't aware of this file
        ".token": {
          "&.comment, &.prolog, &.cdata": {
            color: "$codeComment",
          },
          "&.delimiter, &.boolean, &.keyword, &.selector, &.important, &.doctype, &.atrule, &.url": {
            color: "$codeKeyword",
          },
          "&.tag, &.builtin, &.regex": {
            color: "$codeNamespace",
          },
          "&.property, &.constant, &.variable, &.attr-value, &.class-name, &.string, &.char": {
            color: "$codeVariable",
          },
          "&.literal-property, &.attr-name": {
            color: "$codeAttribute",
          },
          "&.function": {
            color: "$codeLiteral",
          },
          "&.tag .punctuation, &.attr-value .punctuation": {
            color: "$codePunctuation",
          },
          "&.inserted": {
            color: "$codeAddition",
          },
          "&.deleted": {
            color: "$codeDeletion",
          },
          "&.url": { textDecoration: "underline" },
          "&.bold": { fontWeight: "bold" },
          "&.italic": { fontStyle: "italic" },
        },
      },
    },
  },
});

const CornerCopyButton = styled(CopyButton, {
  position: "absolute",
  top: 0,
  right: 0,
  padding: "0.65em",
  backgroundColor: "$backgroundInner",
  border: "1px solid $kindaLight",
  borderTopRightRadius: "$rounded",
  borderBottomLeftRadius: "$rounded",

  // light-dark theme switch fading
  transition: "background 0.25s ease, border 0.25s ease",
});

export type CodeBlockProps = ComponentProps<typeof Code> & {
  highlight?: boolean;
};

const CodeBlock = ({ highlight, className, children, ...rest }: CodeBlockProps) => {
  return (
    <Block highlight={highlight}>
      <CornerCopyButton source={children} />
      <Code className={className?.replace("code-highlight", "").trim()} {...rest}>
        {children}
      </Code>
    </Block>
  );
};

export default CodeBlock;
