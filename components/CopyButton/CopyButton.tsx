import { forwardRef, useState, useEffect } from "react";
import classNames from "classnames/bind";
import copy from "copy-to-clipboard";
import innerText from "react-innertext";
import { ClipboardOcticon, CheckOcticon } from "../Icons";
import type { ReactNode, Ref } from "react";

import styles from "./CopyButton.module.css";
const cx = classNames.bind(styles);

type CopyButtonProps = {
  source: ReactNode;
  timeout?: number;
  className?: string;
};

const CopyButton = forwardRef(function CopyButton(
  { source, timeout = 2000, className }: CopyButtonProps,
  ref: Ref<HTMLButtonElement>
) {
  const [copied, setCopied] = useState(false);

  const handleCopy = (e) => {
    // prevent unintentional double-clicks by unfocusing button
    e.target.blur();

    // send plaintext to the clipboard
    const didCopy = copy(innerText(source));

    // indicate success
    setCopied(didCopy);
  };

  useEffect(() => {
    // reset to original icon after given ms (defaults to 2 seconds)
    if (copied) {
      const reset = setTimeout(() => {
        setCopied(false);
      }, timeout);

      return () => clearTimeout(reset);
    }

    // eslint-disable-next-line @typescript-eslint/no-empty-function
    return () => {};
  }, [timeout, copied]);

  return (
    <button
      className={cx({ button: true, success: !!copied }, className)}
      title="Copy to clipboard"
      aria-label="Copy to clipboard"
      onClick={handleCopy}
      disabled={!!copied}
      ref={ref}
    >
      {copied ? (
        <CheckOcticon className={styles.icon} fill="currentColor" />
      ) : (
        <ClipboardOcticon className={styles.icon} fill="currentColor" />
      )}
    </button>
  );
});

export default CopyButton;
