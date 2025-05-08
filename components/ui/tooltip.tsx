"use client";

import * as TooltipPrimitive from "@radix-ui/react-tooltip";
import { cn } from "@/lib/utils";
import type { ComponentPropsWithoutRef } from "react";

const TooltipProvider = ({
  delayDuration = 0,
  ...rest
}: ComponentPropsWithoutRef<typeof TooltipPrimitive.Provider>) => {
  return <TooltipPrimitive.Provider data-slot="tooltip-provider" delayDuration={delayDuration} {...rest} />;
};

const Tooltip = ({ ...rest }: ComponentPropsWithoutRef<typeof TooltipPrimitive.Root>) => {
  return (
    <TooltipProvider>
      <TooltipPrimitive.Root data-slot="tooltip" {...rest} />
    </TooltipProvider>
  );
};

const TooltipTrigger = ({ ...rest }: ComponentPropsWithoutRef<typeof TooltipPrimitive.Trigger>) => {
  return <TooltipPrimitive.Trigger data-slot="tooltip-trigger" {...rest} />;
};

const TooltipContent = ({
  className,
  sideOffset = 0,
  children,
  ...rest
}: ComponentPropsWithoutRef<typeof TooltipPrimitive.Content>) => {
  return (
    <TooltipPrimitive.Portal>
      <TooltipPrimitive.Content
        data-slot="tooltip-content"
        sideOffset={sideOffset}
        className={cn(
          "animate-in fade-in-0 zoom-in-95 data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=closed]:zoom-out-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 z-50 w-fit origin-(--radix-tooltip-content-transform-origin) rounded-md bg-black px-3 py-1.5 text-xs text-balance text-white/90 shadow select-none",
          className
        )}
        {...rest}
      >
        {children}
        <TooltipPrimitive.Arrow className="z-50 size-2.5 translate-y-[calc(-50%_-_2px)] rotate-45 rounded-[2px] bg-black fill-black shadow" />
      </TooltipPrimitive.Content>
    </TooltipPrimitive.Portal>
  );
};

export { Tooltip, TooltipTrigger, TooltipContent, TooltipProvider };
