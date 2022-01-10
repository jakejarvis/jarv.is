import dynamic from "next/dynamic";
import type { ReactNode } from "react";

type CustomCodeProps = {
  className?: string;
  children: ReactNode;
};

const CustomCode = (props: CustomCodeProps) => {
  if (props.className?.split(" ").includes("hljs")) {
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
          .hljs {
            color: var(--highlight-color);
            background: var(--highlight-bg);
          }

          .hljs-subst {
            color: var(--highlight-color);
          }

          .hljs-comment {
            color: var(--highlight-comment);
          }

          .hljs-keyword,
          .hljs-selector-tag,
          .hljs-doctag,
          .hljs-section,
          .hljs-selector-class,
          .hljs-selector-pseudo,
          .hljs-meta,
          .hljs-meta .hljs-keyword {
            color: var(--highlight-keyword);
          }

          .hljs-attr {
            color: var(--highlight-attribute);
          }

          .hljs-attribute {
            color: var(--highlight-symbol);
          }

          .hljs-name,
          .hljs-type,
          .hljs-number,
          .hljs-selector-id,
          .hljs-quote,
          .hljs-template-tag {
            color: var(--highlight-namespace);
          }

          .hljs-string,
          .hljs-regexp,
          .hljs-symbol,
          .hljs-variable,
          .hljs-template-variable,
          .hljs-link,
          .hljs-selector-attr,
          .hljs-meta .hljs-string {
            color: var(--highlight-variable);
          }

          .hljs-built_in,
          .hljs-title,
          .hljs-literal {
            color: var(--highlight-literal);
          }

          .hljs-bullet,
          .hljs-code {
            color: var(--highlight-punctuation);
          }

          .hljs-deletion {
            color: var(--highlight-deletion);
          }

          .hljs-addition {
            color: var(--highlight-addition);
          }

          .hljs-emphasis {
            font-style: italic;
          }

          .hljs-strong {
            font-weight: bold;
          }

          .hljs-formula,
          .hljs-operator,
          .hljs-params,
          .hljs-property,
          .hljs-punctuation,
          .hljs-tag {
            /* intentionally empty */
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
