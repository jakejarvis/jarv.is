"use client";

import * as SeparatorPrimitive from "@radix-ui/react-separator";
import { cn } from "@/lib/utils";
import type { ComponentPropsWithoutRef } from "react";

const Separator = ({
  className,
  orientation = "horizontal",
  decorative = true,
  ...rest
}: ComponentPropsWithoutRef<typeof SeparatorPrimitive.Root>) => {
  return (
    <SeparatorPrimitive.Root
      data-slot="separator-root"
      decorative={decorative}
      orientation={orientation}
      className={cn(
        "bg-border shrink-0 data-[orientation=horizontal]:h-px data-[orientation=horizontal]:w-full data-[orientation=vertical]:h-full data-[orientation=vertical]:w-px",
        className
      )}
      {...rest}
    />
  );
};

export default Separator;
