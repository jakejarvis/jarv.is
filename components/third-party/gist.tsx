import { cacheLife, cacheTag } from "next/cache";

import { cn } from "@/lib/utils";

const Gist = async ({
  id,
  file,
  title,
  className,
  ...rest
}: {
  id: string;
  file?: string;
  title?: string;
} & React.ComponentProps<"iframe">) => {
  "use cache";
  cacheTag("gist", `gist-${id}${file ? `-${file}` : ""}`);

  const iframeId = `gist-${id}${file ? `-${file}` : ""}`;

  const iframeTitle = title ?? `GitHub Gist ${id}${file ? ` - ${file}` : ""}`;

  const scriptUrl = `https://gist.github.com/${id}.js${file ? `?file=${file}` : ""}`;
  let script: string | null = null;
  try {
    const scriptResponse = await fetch(scriptUrl);
    if (scriptResponse.ok) {
      script = await scriptResponse.text();
    } else {
      console.warn(`[gist] failed to fetch js:`, scriptResponse.statusText);
    }
  } catch (error) {
    console.warn(`[gist] failed to fetch js:`, error);
  }

  if (script === null) {
    // don't pin a (possibly transient) fetch failure into the page for 30 days -- retry soon
    cacheLife("hours");

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

  cacheLife("max");

  // https://github.com/tleunen/react-gist/blob/master/src/index.js#L29
  const iframeHtml = `<html><head><base target="_parent"></head><body onload="parent.document.getElementById('${iframeId}').style.height=document.body.scrollHeight + 'px'" style="margin:0"><script>${script}</script></body></html>`;

  return (
    <iframe
      width="100%"
      scrolling="no"
      id={iframeId}
      srcDoc={iframeHtml}
      title={iframeTitle}
      sandbox="allow-scripts"
      className={cn("overflow-hidden border-none", className)}
      {...rest}
      suppressHydrationWarning
    />
  );
};

export { Gist };
