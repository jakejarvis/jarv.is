import dynamic from "next/dynamic";

const CustomCode = (props: any) => {
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
        `}</style>
      </div>
    );
  } else {
    // inline code in paragraphs, headings, etc. (not highlighted)
    return <code {...props}>{props.children}</code>;
  }
};

export default CustomCode;
