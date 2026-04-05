"use client";

import { useEffect, useRef, useState } from "react";

import { cn } from "@/lib/utils";

const Gist = ({
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
  const iframeId = `gist-${id}${file ? `-${file}` : ""}`;
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const [html, setHtml] = useState<string | null>(null);
  const [error, setError] = useState(false);

  useEffect(() => {
    const scriptUrl = `https://gist.github.com/${id}.js${file ? `?file=${file}` : ""}`;

    fetch(scriptUrl)
      .then((res) => {
        if (!res.ok) throw new Error(res.statusText);
        return res.text();
      })
      .then((script) => {
        setHtml(
          `<html><head><base target="_parent"></head><body onload="parent.document.getElementById('${iframeId}').style.height=document.body.scrollHeight + 'px'" style="margin:0"><script>${script}</script></body></html>`,
        );
      })
      .catch(() => setError(true));
  }, [id, file, iframeId]);

  if (error) {
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

  if (!html) {
    return <div className="bg-muted my-6 h-32 animate-pulse rounded-lg" />;
  }

  return (
    <iframe
      sandbox="allow-scripts allow-popups"
      ref={iframeRef}
      width="100%"
      scrolling="no"
      id={iframeId}
      srcDoc={html}
      title={title || `GitHub Gist ${id}${file ? ` - ${file}` : ""}`}
      className={cn("overflow-hidden border-none", className)}
      {...rest}
    />
  );
};

export { Gist };
