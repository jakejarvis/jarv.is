import CodeBlock from "../CodeBlock";
import CodeInline from "../CodeInline";
import type { ComponentPropsWithoutRef } from "react";

export type CodeProps = ComponentPropsWithoutRef<"code"> & {
  forceBlock?: boolean;
};

// a simple wrapper component that "intelligently" picks between inline code and code blocks (w/ optional syntax
// highlighting & a clipboard button)
const Code = ({ forceBlock, className, children, ...rest }: CodeProps) => {
  // detect if this input has already been touched by prism.js via rehype
  const classNames = className?.split(" ");
  const prismEnabled = classNames?.includes("code-highlight");

  if (prismEnabled || forceBlock) {
    // full multi-line code blocks with copy-to-clipboard button
    // automatic if highlighted by prism, otherwise can be forced (rather than inlined) with `forceBlock={true}`
    return (
      <CodeBlock
        highlight={prismEnabled && !classNames?.includes("language-plaintext")}
        withCopyButton
        className={className}
        {...rest}
      >
        {children}
      </CodeBlock>
    );
  }

  // simple inline code in paragraphs, headings, etc. (never highlighted)
  return (
    <CodeInline className={className} {...rest}>
      {children}
    </CodeInline>
  );
};

export default Code;
