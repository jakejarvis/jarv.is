"use client";

import Frame from "react-frame-component";
import useHasMounted from "../../hooks/useHasMounted";

export type GistEmbedProps = {
  id: string;
  file?: string;
};

const GistEmbed = ({ id, file }: GistEmbedProps) => {
  const hasMounted = useHasMounted();

  const scriptUrl = `https://gist.github.com/${id}.js${file ? `?file=${file}` : ""}`;
  const iframeId = file ? `gist-${id}-${file}` : `gist-${id}`;
  // https://github.com/tleunen/react-gist/blob/master/src/index.js#L29
  const iframeHtml = `<html><head><base target="_parent"><style>*{font-size:12px;}</style></head><body onload="parent.document.getElementById('${iframeId}').style.height=document.body.scrollHeight + 'px'" style="margin:0;"><script type="text/javascript" src="${scriptUrl}"></script></body></html>`;

  return (
    <>
      {hasMounted && (
        <Frame
          width="100%"
          frameBorder={0}
          scrolling="no"
          id={iframeId}
          initialContent={iframeHtml}
          style={{ height: "0px", overflow: "hidden" }}
        >
          <></>
        </Frame>
      )}
    </>
  );
};

export default GistEmbed;
