import dynamic from "next/dynamic";
import type { ReactNode } from "react";

type CustomCodeProps = {
  className?: string;
  children: ReactNode;
};

const CustomCode = (props: CustomCodeProps) => {
  if (props.className?.split(" ").includes("code-highlight")) {
    const CopyButton = dynamic(() => import("../clipboard/CopyButton"));

    // full multi-line code blocks with highlight.js and copy-to-clipboard button
    return (
      <div>
        <CopyButton source={props.children} />
        <code {...props}>{props.children}</code>

        <style jsx>{`
          div {
            position: relative;
            max-width: 100%;
            overflow-x: scroll;
            margin: 1em 0;
          }

          div > code {
            display: block;
            overflow-x: auto;
            padding: 1em;
            tab-size: 2;
          }
        `}</style>

        <style jsx global>{`
          .code-highlight {
            color: var(--code-text);
            background: var(--code-background);
          }

          /* leave room for clipboard button to the right of the first line */
          .code-highlight > .code-line:first-of-type {
            margin-right: 3em;
          }

          .code-highlight > .code-line.line-number::before {
            display: inline-block;
            width: 1.5em;
            margin-right: 1.5em;
            text-align: right;
            color: var(--code-comment);
            content: attr(line); /* added to spans by prism */
          }

          .code-highlight .token.comment,
          .code-highlight .token.prolog,
          .code-highlight .token.cdata {
            color: var(--code-comment);
          }

          .code-highlight .token.delimiter,
          .code-highlight .token.boolean,
          .code-highlight .token.keyword,
          .code-highlight .token.selector,
          .code-highlight .token.important,
          .code-highlight .token.doctype,
          .code-highlight .token.atrule,
          .code-highlight .token.url {
            color: var(--code-keyword);
          }

          .code-highlight .token.tag,
          .code-highlight .token.builtin,
          .code-highlight .token.regex {
            color: var(--code-namespace);
          }

          .code-highlight .token.property,
          .code-highlight .token.constant,
          .code-highlight .token.variable,
          .code-highlight .token.attr-value,
          .code-highlight .token.class-name,
          .code-highlight .token.string,
          .code-highlight .token.char {
            color: var(--code-variable);
          }

          .code-highlight .token.literal-property,
          .code-highlight .token.attr-name {
            color: var(--code-attribute);
          }

          .code-highlight .token.function {
            color: var(--code-literal);
          }

          .code-highlight .token.tag .punctuation,
          .code-highlight .token.attr-value .punctuation {
            color: var(--code-punctuation);
          }

          .code-highlight .token.inserted {
            background-color: var(--code-addition);
          }

          .code-highlight .token.deleted {
            background-color: var(--code-deletion);
          }

          .code-highlight .token.url {
            text-decoration: underline;
          }

          .code-highlight .token.bold {
            font-weight: bold;
          }

          .code-highlight .token.italic {
            font-style: italic;
          }
        `}</style>
      </div>
    );
  } else {
    // inline code in paragraphs, headings, etc. (not highlighted)
    return <code {...props}>{props.children}</code>;
  }
};

export default CustomCode;
