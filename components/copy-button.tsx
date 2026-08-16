"use client";

import { IconCheck, IconCopy } from "@tabler/icons-react";
import * as React from "react";

import { Button } from "@/components/ui/button";
import { toast } from "@/components/ui/toast";
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

  const handleCopy = async () => {
    if (hasCopied) return;

    try {
      await navigator.clipboard.writeText(value);
      setHasCopied(true);

      toast.add({
        title: "Copied!",
        type: "success",
        timeout: 2000,
        id: "copy-button-toast-success",
      });
    } catch (error) {
      console.error("Failed to copy:", error);

      toast.add({
        title: "Failed to copy; see console for details.",
        type: "error",
        id: "copy-button-toast-error",
      });
    } finally {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }

      timeoutRef.current = setTimeout(() => setHasCopied(false), 2000);
    }
  };

  return (
    <Button
      data-slot="copy-button"
      data-copied={hasCopied}
      size="icon"
      variant={variant}
      className={cn(
        "absolute top-3 right-2 z-10 size-7.5 bg-code text-muted-foreground hover:bg-accent hover:opacity-100 focus-visible:opacity-100 dark:hover:bg-accent",
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
