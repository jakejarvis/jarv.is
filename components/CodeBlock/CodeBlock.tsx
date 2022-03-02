import CopyButton from "../CopyButton/CopyButton";
import { styled } from "../../lib/styles/stitches.config";
import type { ComponentProps } from "react";

const Code = styled("code", {
  fontSize: "0.925em",
  color: "$codeText",
  pageBreakInside: "avoid",
  backgroundColor: "$codeBackground",
  border: "1px solid $kindaLight",
  borderRadius: "$rounded",

  // light-dark theme switch fading
  transition: "background 0.25s ease, border 0.25s ease",

  variants: {
    highlight: {
      // the following sub-classes MUST be global -- the prism rehype plugin isn't aware of this file
      true: {
        // leave room for clipboard button to the right of the first line
        ".code-line:first-of-type": {
          marginRight: "3em",
        },
        ".line-number::before": {
          display: "inline-block",
          width: "1.5em",
          marginRight: "1.5em",
          textAlign: "right",
          color: "$codeComment",
          content: "attr(line)", // added to spans by prism
          userSelect: "none",
        },
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

const InlineCode = styled(Code, {
  padding: "0.2em 0.3em",
});

const Block = styled("div", {
  position: "relative",
  width: "100%",
  margin: "1em auto",

  [`& ${Code}`]: {
    display: "block",
    overflowX: "auto",
    padding: "1em",
    tabSize: 2,
  },
});

const CornerCopyButton = styled(CopyButton, {
  position: "absolute",
  top: 0,
  right: 0,
  padding: "0.65em",
  color: "$mediumDark",
  backgroundColor: "$backgroundInner",
  border: "1px solid $kindaLight",
  borderTopRightRadius: "$rounded",
  borderEndStartRadius: "$rounded",

  // light-dark theme switch fading
  transition: "background 0.25s ease, border 0.25s ease",

  "&:hover": {
    color: "$link",
  },
});

export type CodeBlockProps = ComponentProps<typeof Code> & {
  forceBlock?: boolean;
};

const CodeBlock = ({ forceBlock, className, children, ...rest }: CodeBlockProps) => {
  // detect if this input has already been touched by prism.js via rehype
  const prismEnabled = className?.split(" ").includes("code-highlight");

  if (prismEnabled || forceBlock) {
    // full multi-line code blocks with copy-to-clipboard button
    // automatic if highlighted by prism, otherwise can be forced (rather than inlined) with `forceBlock={true}`
    return (
      <Block>
        <CornerCopyButton source={children} />
        <Code highlight={prismEnabled} className={className?.replace("code-highlight", "").trim()} {...rest}>
          {children}
        </Code>
      </Block>
    );
  } else {
    // inline code in paragraphs, headings, etc. (not highlighted)
    return (
      <InlineCode className={className} {...rest}>
        {children}
      </InlineCode>
    );
  }
};

export default CodeBlock;
