import { forwardRef, useState, useEffect } from "react";
import innerText from "react-innertext";
import copy from "copy-to-clipboard";
import { FiClipboard, FiCheck } from "react-icons/fi";
import { styled, theme } from "../../lib/styles/stitches.config";
import type { ReactNode, Ref, ComponentPropsWithoutRef, ElementRef, MouseEventHandler } from "react";

const Button = styled("button", {
  lineHeight: 1,
  cursor: "pointer",

  variants: {
    copied: {
      true: {
        color: theme.colors.success,
      },
      false: {
        color: theme.colors.mediumDark,

        "&:hover, &:focus-visible": {
          color: theme.colors.link,
        },
      },
    },
  },
});

const Icon = styled("svg", {
  width: "1.25em",
  height: "1.25em",
  verticalAlign: "-0.3em",
});

export type CopyButtonProps = ComponentPropsWithoutRef<typeof Button> & {
  source: string | ReactNode;
  timeout?: number;
};

const CopyButton = ({ source, timeout = 2000, ...rest }: CopyButtonProps, ref: Ref<ElementRef<typeof Button>>) => {
  const [copied, setCopied] = useState(false);

  const handleCopy: MouseEventHandler<ElementRef<typeof Button>> = (e) => {
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
    <Button
      ref={ref}
      title="Copy to clipboard"
      aria-label="Copy to clipboard"
      onClick={handleCopy}
      disabled={copied}
      copied={copied}
      {...rest}
    >
      <Icon as={copied ? FiCheck : FiClipboard} />
    </Button>
  );
};

export default forwardRef(CopyButton);
