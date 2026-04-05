import { cn } from "@/lib/utils";

// https://magicui.design/docs/components/marquee
const Marquee = ({
  repeat = 3,
  className,
  children,
  ...rest
}: React.ComponentProps<"div"> & {
  reverse?: boolean;
  pauseOnHover?: boolean;
  repeat?: number;
}) => (
  <div
    className={cn("group flex flex-row overflow-hidden [--gap:2rem] [gap:var(--gap)]", className)}
    {...rest}
  >
    {Array(repeat)
      .fill(0)
      .map((_, i) => (
        <div
          // biome-ignore lint/suspicious/noArrayIndexKey: identical clones for animation; no natural unique key exists
          key={i}
          className="flex shrink-0 flex-row justify-around [gap:var(--gap)] motion-safe:animate-marquee"
        >
          {children}
        </div>
      ))}
  </div>
);

export { Marquee };
