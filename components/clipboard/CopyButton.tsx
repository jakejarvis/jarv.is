import { useState, useEffect } from "react";
import copy from "copy-to-clipboard";
import innerText from "react-innertext";
import { CopyOcticon, CheckOcticon } from "../icons/octicons";

import styles from "./CopyButton.module.css";

import type { ReactNode } from "react";

type Props = {
  source: ReactNode;
  timeout?: number;
};

const CopyButton = ({ source, timeout = 2000 }: Props) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = (e) => {
    // stop browser from navigating away from page (this shouldn't happen anyways)
    e.preventDefault();
    // prevent unintentional double-clicks by unfocusing button
    e.target.blur();

    // send plaintext to the clipboard
    const didCopy = copy(innerText(source));

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
        <CheckOcticon fill="currentColor" className={`${styles.octicon} ${styles["octicon-check"]}`} />
      ) : (
        <CopyOcticon fill="currentColor" className={styles.octicon} />
      )}
    </button>
  );
};

export default CopyButton;
