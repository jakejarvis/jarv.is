"use client";

import * as AvatarPrimitive from "@radix-ui/react-avatar";
import { cn } from "@/lib/utils";
import type { ComponentPropsWithoutRef } from "react";

const Avatar = ({ className, ...rest }: ComponentPropsWithoutRef<typeof AvatarPrimitive.Root>) => {
  return (
    <AvatarPrimitive.Root
      data-slot="avatar"
      className={cn("relative flex size-8 shrink-0 overflow-hidden rounded-full", className)}
      {...rest}
    />
  );
};

const AvatarImage = ({ className, ...rest }: ComponentPropsWithoutRef<typeof AvatarPrimitive.Image>) => {
  return (
    <AvatarPrimitive.Image data-slot="avatar-image" className={cn("aspect-square size-full", className)} {...rest} />
  );
};

const AvatarFallback = ({ className, ...rest }: ComponentPropsWithoutRef<typeof AvatarPrimitive.Fallback>) => {
  return (
    <AvatarPrimitive.Fallback
      data-slot="avatar-fallback"
      className={cn("bg-muted flex size-full items-center justify-center rounded-full", className)}
      {...rest}
    />
  );
};

export { Avatar, AvatarImage, AvatarFallback };
