"use client";

import * as AspectRatioPrimitive from "@radix-ui/react-aspect-ratio";
import type { ComponentPropsWithoutRef } from "react";

const AspectRatio = ({ ...rest }: ComponentPropsWithoutRef<typeof AspectRatioPrimitive.Root>) => {
  return <AspectRatioPrimitive.Root data-slot="aspect-ratio" {...rest} />;
};

export default AspectRatio;
