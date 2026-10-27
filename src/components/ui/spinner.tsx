import { IconLoader2 } from "@tabler/icons-react";

import { cn } from "@/lib/utils";

function Spinner({ className, ...props }: React.ComponentProps<"svg">) {
  return (
    <IconLoader2
      // oxlint-disable-next-line jsx-a11y/prefer-tag-over-role
      role="status"
      aria-label="Loading"
      className={cn("size-4 animate-spin", className)}
      {...props}
    />
  );
}

export { Spinner };
