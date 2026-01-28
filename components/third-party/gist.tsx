import { cn } from "@/lib/utils";

const Gist = async ({
  id,
  file,
  className,
  ...rest
}: { id: string; file?: string } & React.ComponentProps<"iframe">) => {
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
        <a
          href={`https://gist.github.com/${id}${file ? `?file=${file}` : ""}`}
          target="_blank"
          rel="noopener noreferrer"
        >
          Try opening it manually?
        </a>
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
      className={cn("overflow-hidden border-none", className)}
      {...rest}
      suppressHydrationWarning
    />
  );
};

export { Gist };
