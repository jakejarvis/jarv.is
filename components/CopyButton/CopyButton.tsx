"use client";

import { forwardRef, useState, useEffect } from "react";
import innerText from "react-innertext";
import copy from "copy-to-clipboard";
import clsx from "clsx";
import { ClipboardIcon, CheckIcon } from "lucide-react";
import type { ReactNode, Ref, ComponentPropsWithoutRef, ElementRef, MouseEventHandler } from "react";

import styles from "./CopyButton.module.css";

export type CopyButtonProps = ComponentPropsWithoutRef<"button"> & {
  source: string | ReactNode;
  timeout?: number;
};

const CopyButton = (
  { source, timeout = 2000, className, ...rest }: CopyButtonProps,
  ref: Ref<ElementRef<"button">>
) => {
  const [copied, setCopied] = useState(false);

  const handleCopy: MouseEventHandler<ElementRef<"button">> = (e) => {
    // prevent unintentional double-clicks by unfocusing button
    e.currentTarget.blur();

    // send plaintext to the clipboard
    const didCopy = copy(innerText(source));

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
      title="Copy to clipboard"
      aria-label="Copy to clipboard"
      onClick={handleCopy}
      disabled={copied}
      className={clsx(styles.button, copied && styles.copied, className)}
      {...rest}
    >
      {copied ? (
        <CheckIcon size="1.25em" className={styles.icon} />
      ) : (
        <ClipboardIcon size="1.25em" className={styles.icon} />
      )}
    </button>
  );
};

export default forwardRef(CopyButton);
