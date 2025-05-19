"use client";

import * as PopoverPrimitive from "@radix-ui/react-popover";
import { cn } from "@/lib/utils";

const Popover = ({ ...rest }: React.ComponentProps<typeof PopoverPrimitive.Root>) => {
  return <PopoverPrimitive.Root data-slot="popover" {...rest} />;
};

const PopoverTrigger = ({ ...rest }: React.ComponentProps<typeof PopoverPrimitive.Trigger>) => {
  return <PopoverPrimitive.Trigger data-slot="popover-trigger" {...rest} />;
};

const PopoverContent = ({
  className,
  align = "center",
  sideOffset = 4,
  ...rest
}: React.ComponentProps<typeof PopoverPrimitive.Content>) => {
  return (
    <PopoverPrimitive.Portal>
      <PopoverPrimitive.Content
        data-slot="popover-content"
        align={align}
        sideOffset={sideOffset}
        className={cn(
          "bg-popover text-popover-foreground z-50 w-72 rounded-md border p-4 shadow-md outline-hidden",
          className
        )}
        {...rest}
      />
    </PopoverPrimitive.Portal>
  );
};

const PopoverAnchor = ({ ...rest }: React.ComponentProps<typeof PopoverPrimitive.Anchor>) => {
  return <PopoverPrimitive.Anchor data-slot="popover-anchor" {...rest} />;
};

export { Popover, PopoverTrigger, PopoverContent, PopoverAnchor };
