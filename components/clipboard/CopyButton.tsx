import { useState, useEffect } from "react";
import copy from "copy-to-clipboard";
import trimNewlines from "trim-newlines";
import { CopyIcon, CheckIcon } from "@primer/octicons-react";

import styles from "./CopyButton.module.scss";

type Props = {
  content: string;
  timeout?: number;
};

export default function CopyButton({ content, timeout = 2000 }: Props) {
  const [copied, setCopied] = useState(false);

  const handleCopy = (e) => {
    // stop browser from navigating away from page (this shouldn't happen anyways)
    e.preventDefault();
    // prevent unintentional double-clicks by unfocusing button
    e.target.blur();

    // trim any surrounding whitespace from target block's content and send it to the clipboard
    const didCopy = copy(trimNewlines(content));

    // indicate success
    setCopied(didCopy);
  };

  useEffect(() => {
    // reset everything after given ms (defaults to 2 seconds)
    if (copied) {
      const id = setTimeout(() => {
        setCopied(false);
      }, timeout);

      return () => clearTimeout(id);
    }

    return () => {};
  }, [timeout, copied]);

  return (
    <button
      className={styles.copy_button}
      title="Copy to clipboard"
      aria-label="Copy to clipboard"
      onClick={handleCopy}
      disabled={copied}
    >
      {copied ? (
        <CheckIcon size={16} className={`${styles.octicon} ${styles["octicon-check"]}`} />
      ) : (
        <CopyIcon size={16} className={styles.octicon} />
      )}
    </button>
  );
}
