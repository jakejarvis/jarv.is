"use client";

import { IconCheck, IconClipboardCheck, IconCopy } from "@tabler/icons-react";
import copy from "copy-to-clipboard";
import * as React from "react";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

function CopyButton({
  value,
  className,
  variant = "ghost",
  ...props
}: React.ComponentProps<typeof Button> & {
  value: string;
}) {
  const [hasCopied, setHasCopied] = React.useState(false);
  const timeoutRef = React.useRef<NodeJS.Timeout | undefined>(undefined);

  React.useEffect(
    () => () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    },
    [],
  );

  const handleCopy = () => {
    if (hasCopied) return;

    copy(value);
    setHasCopied(true);
    toast.success("Copied!", {
      icon: <IconClipboardCheck className="text-foreground/85 size-4" aria-hidden="true" />,
      duration: 2000,
      id: "copy-button-toast-success",
    });

    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
    timeoutRef.current = setTimeout(() => setHasCopied(false), 2000);
  };

  return (
    <Button
      data-slot="copy-button"
      data-copied={hasCopied}
      size="icon"
      variant={variant}
      className={cn(
        "text-muted-foreground bg-code hover:bg-accent dark:hover:bg-accent absolute top-3 right-2 z-10 size-7.5 hover:opacity-100 focus-visible:opacity-100",
        hasCopied ? "cursor-default" : "cursor-pointer",
        className,
      )}
      onClick={handleCopy}
      aria-label={hasCopied ? "Copied" : "Copy to clipboard"}
      {...props}
    >
      {hasCopied ? (
        <IconCheck className="text-green-600 dark:text-green-400" aria-hidden="true" />
      ) : (
        <IconCopy aria-hidden="true" />
      )}
    </Button>
  );
}

export { CopyButton };
