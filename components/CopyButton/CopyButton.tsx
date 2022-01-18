import { useState, useEffect } from "react";
import classNames from "classnames/bind";
import copy from "copy-to-clipboard";
import innerText from "react-innertext";
import { ClipboardOcticon, CheckOcticon } from "../Icons";
import type { ReactNode } from "react";

import styles from "./CopyButton.module.css";
const cx = classNames.bind(styles);

type Props = {
  source: ReactNode;
  timeout?: number;
};

const CopyButton = ({ source, timeout = 2000 }: Props) => {
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
      className={cx({ copy: true, success: !!copied })}
      title="Copy to clipboard"
      aria-label="Copy to clipboard"
      onClick={handleCopy}
      disabled={!!copied}
    >
      {copied ? (
        <CheckOcticon className="icon" fill="currentColor" />
      ) : (
        <ClipboardOcticon className="icon" fill="currentColor" />
      )}
    </button>
  );
};

export default CopyButton;
