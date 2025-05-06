import { cn } from "@/lib/utils";
import type { ComponentPropsWithoutRef } from "react";

const CodePen = ({
  username,
  id,
  height = 500,
  defaultTab = "html",
  preview = true,
  editable = false,
  style,
  className,
  ...rest
}: {
  username: string;
  id: string;
  height?: number;
  defaultTab?: string;
  preview?: boolean;
  editable?: boolean;
} & ComponentPropsWithoutRef<"iframe">) => {
  return (
    <iframe
      src={`https://codepen.io/${username}/embed/${id}/?${new URLSearchParams({
        "default-tab": `${defaultTab},result`,
        preview: `${!!preview}`,
        editable: `${!!editable}`,
      })}`}
      style={{ height: `${height}px`, ...style }}
      className={cn("w-full overflow-hidden border-none", className)}
      {...rest}
    />
  );
};

export default CodePen;
