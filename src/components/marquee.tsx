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
    className={cn("group flex flex-row [gap:var(--gap)] overflow-hidden [--gap:2rem]", className)}
    {...rest}
  >
    {Array(repeat)
      .fill(0)
      .map((_, i) => (
        <div
          // eslint-disable-next-line react/no-array-index-key -- identical clones for animation; no natural unique key exists
          key={i}
          className="motion-safe:animate-marquee flex shrink-0 flex-row justify-around [gap:var(--gap)]"
        >
          {children}
        </div>
      ))}
  </div>
);

export { Marquee };
