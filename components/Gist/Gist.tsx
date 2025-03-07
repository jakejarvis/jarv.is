import Link from "../Link";

export type GistProps = {
  id: string;
  file?: string;
};

const Gist = async ({ id, file }: GistProps) => {
  const iframeId = `gist-${id}${file ? `-${file}` : ""}`;

  const scriptUrl = `https://gist.github.com/${id}.js${file ? `?file=${file}` : ""}`;
  const scriptResponse = await fetch(scriptUrl);

  if (!scriptResponse.ok) {
    console.warn(`[gist] fetching js for https://gist.github.com/${id} failed:`, scriptResponse.statusText);

    return (
      <p style={{ textAlign: "center" }}>
        Failed to load gist.{" "}
        <Link href={`https://gist.github.com/${id}${file ? `?file=${file}` : ""}`}>Try opening it manually?</Link>
      </p>
    );
  }

  const script = await scriptResponse.text();

  // https://github.com/tleunen/react-gist/blob/master/src/index.js#L29
  const iframeHtml = `<html><head><base target="_parent"></head><body onload="parent.document.getElementById('${iframeId}').style.height=document.body.scrollHeight + 'px'" style="margin:0"><script>${script}</script></body></html>`;

  return (
    <iframe
      width="100%"
      scrolling="no"
      id={iframeId}
      srcDoc={iframeHtml}
      sandbox="allow-same-origin allow-scripts allow-popups allow-top-navigation-by-user-activation"
      style={{ border: "0", overflow: "hidden" }}
      suppressHydrationWarning
    ></iframe>
  );
};

export default Gist;
