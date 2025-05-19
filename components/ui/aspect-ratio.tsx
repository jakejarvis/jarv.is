"use client";

import * as AspectRatioPrimitive from "@radix-ui/react-aspect-ratio";

const AspectRatio = ({ ...rest }: React.ComponentProps<typeof AspectRatioPrimitive.Root>) => {
  return <AspectRatioPrimitive.Root data-slot="aspect-ratio" {...rest} />;
};

export default AspectRatio;
