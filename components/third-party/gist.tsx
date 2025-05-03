import Link from "@/components/link";

export type GistProps = {
  id: string;
  file?: string;
};

const Gist = async ({ id, file }: GistProps) => {
  const iframeId = `gist-${id}${file ? `-${file}` : ""}`;

  const scriptUrl = `https://gist.github.com/${id}.js${file ? `?file=${file}` : ""}`;
  const scriptResponse = await fetch(scriptUrl, {
    cache: "force-cache",
    next: {
      revalidate: false, // cache indefinitely in data store
      tags: ["gist"],
    },
  });

  if (!scriptResponse.ok) {
    console.warn(`[gist] failed to fetch js:`, scriptResponse.statusText);

    return (
      <p className="text-center">
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
      className="overflow-hidden border-none"
      suppressHydrationWarning
    />
  );
};

export default Gist;
