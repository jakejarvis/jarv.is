import { cn } from "@/lib/utils";
import type { ComponentPropsWithoutRef } from "react";

// https://magicui.design/docs/components/marquee
const Marquee = ({
  reverse = false,
  pauseOnHover = false,
  repeat = 3,
  className,
  children,
  ...rest
}: ComponentPropsWithoutRef<"div"> & {
  reverse?: boolean;
  pauseOnHover?: boolean;
  repeat?: number;
}) => {
  return (
    <div className={cn("group flex flex-row [gap:var(--gap)] overflow-hidden [--gap:2rem]", className)} {...rest}>
      {Array(repeat)
        .fill(0)
        .map((_, i) => (
          <div
            key={i}
            className={cn(
              "motion-safe:animate-marquee flex shrink-0 flex-row justify-around [gap:var(--gap)]",
              pauseOnHover && "group-hover:[animation-play-state:paused]",
              reverse && "[animation-direction:reverse]"
            )}
          >
            {children}
          </div>
        ))}
    </div>
  );
};

export default Marquee;
