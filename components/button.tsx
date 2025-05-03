import { cn } from "@/lib/utils";
import type { ComponentPropsWithoutRef } from "react";

export type ButtonProps = ComponentPropsWithoutRef<"button">;

const Button = ({ className, ...rest }: ButtonProps) => {
  return (
    <button
      className={cn(
        "inline-flex cursor-pointer items-center justify-center gap-2 rounded-md text-sm font-medium whitespace-nowrap focus-visible:ring-1 focus-visible:outline-none disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0",
        "bg-primary text-primary-foreground hover:bg-primary/90 shadow",
        "h-9 px-4 py-2",
        className
      )}
      {...rest}
    />
  );
};

export default Button;
