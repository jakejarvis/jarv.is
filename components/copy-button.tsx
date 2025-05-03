"use client";

import { forwardRef, useState, useEffect } from "react";
import copy from "copy-to-clipboard";
import { ClipboardIcon, CheckIcon } from "lucide-react";
import type { Ref, ComponentPropsWithoutRef, ComponentRef, MouseEventHandler } from "react";

export type CopyButtonProps = ComponentPropsWithoutRef<"button"> & {
  source: string;
  timeout?: number;
};

const CopyButton = ({ source, timeout = 2000, style, ...rest }: CopyButtonProps, ref: Ref<ComponentRef<"button">>) => {
  const [copied, setCopied] = useState(false);

  const handleCopy: MouseEventHandler<ComponentRef<"button">> = (e) => {
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
      ref={ref}
      onClick={handleCopy}
      disabled={copied}
      style={{ cursor: copied ? "default" : "pointer", ...style }}
      {...rest}
    >
      {copied ? <CheckIcon className="stroke-success" /> : <ClipboardIcon />}
      <span className="sr-only">{copied ? "Copied" : "Copy to clipboard"}</span>
    </button>
  );
};

export default forwardRef(CopyButton);
