"use client";

import { useState, useEffect } from "react";
import copy from "copy-to-clipboard";
import { ClipboardIcon, CheckIcon } from "lucide-react";
import { cn } from "@/lib/utils";

const CopyButton = ({
  source,
  timeout = 2000,
  className,
  ...rest
}: React.ComponentProps<"button"> & {
  source: string;
  timeout?: number;
}) => {
  const [copied, setCopied] = useState(false);

  const handleCopy: React.MouseEventHandler<React.ComponentRef<"button">> = (e) => {
    // prevent unintentional double-clicks by unfocusing button
    e.currentTarget.blur();

    // send plaintext to the clipboard
    const didCopy = copy(source);

    // indicate success
    setCopied(didCopy);
  };

  useEffect(() => {
    if (!copied) {
      return;
    }

    // reset to original icon after given ms (defaults to 2 seconds)
    const reset = setTimeout(() => {
      setCopied(false);
    }, timeout);

    // cancel timeout to avoid memory leaks if unmounted in the middle of this
    return () => {
      clearTimeout(reset);
    };
  }, [timeout, copied]);

  return (
    <button
      onClick={handleCopy}
      disabled={copied}
      className={cn("cursor-pointer disabled:cursor-default", className)}
      {...rest}
    >
      {copied ? <CheckIcon className="stroke-success" /> : <ClipboardIcon />}
      <span className="sr-only">{copied ? "Copied" : "Copy to clipboard"}</span>
    </button>
  );
};

export default CopyButton;
