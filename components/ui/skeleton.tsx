import { cn } from "@/lib/utils";
import type { ComponentPropsWithoutRef } from "react";

const Skeleton = ({ className, ...rest }: ComponentPropsWithoutRef<"div">) => {
  return <div data-slot="skeleton" className={cn("bg-accent animate-pulse rounded-md", className)} {...rest} />;
};

export default Skeleton;
