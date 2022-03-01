import { forwardRef, useState, useEffect } from "react";
import copy from "copy-to-clipboard";
import innerText from "react-innertext";
import { ClipboardOcticon, CheckOcticon } from "../Icons";
import { styled } from "../../stitches.config";
import type { ReactNode, Ref } from "react";

const Button = styled("button", {
  lineHeight: 1,
  cursor: "pointer",

  variants: {
    success: {
      true: {
        color: "$success !important",
      },
    },
  },
});

const Icon = styled("svg", {
  width: "1.25em",
  height: "1.25em",
  verticalAlign: "-0.3em",
  fill: "currentColor",
});

export type CopyButtonProps = {
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
    <Button
      className={className}
      title="Copy to clipboard"
      aria-label="Copy to clipboard"
      onClick={handleCopy}
      disabled={!!copied}
      success={copied}
      ref={ref}
    >
      <Icon as={copied ? CheckOcticon : ClipboardOcticon} />
    </Button>
  );
});

export default CopyButton;
