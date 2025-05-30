import NextLink from "next/link";
import { cn } from "@/lib/utils";

const Link = ({
  href,
  rel,
  target,
  prefetch = false,
  dynamicOnHover,
  className,
  ...rest
}: React.ComponentProps<typeof NextLink> & {
  // https://github.com/vercel/next.js/pull/77866/files#diff-040f76a8f302dd3a8ec7de0867048475271f052b094cd73d2d0751b495c02f7dR30
  dynamicOnHover?: boolean;
}) => {
  // This component auto-detects whether or not this link should open in the same window (the default for internal
  // links) or a new tab (the default for external links). Defaults can be overridden with `target="_blank"`.
  const isExternal = typeof href === "string" && !["/", "#"].includes(href[0]);

  const linkProps = {
    href,
    target: target || (isExternal ? "_blank" : undefined),
    rel: `${rel ? `${rel} ` : ""}${target === "_blank" || isExternal ? "noopener noreferrer" : ""}`.trim() || undefined,
    className: cn(
      "text-primary decoration-primary/40 no-underline decoration-2 underline-offset-4 hover:underline",
      className
    ),
    ...rest,
  } as React.ComponentProps<"a">;

  // don't waste time with next's component if it's just an external link
  if (isExternal) {
    return <a {...linkProps} />;
  }

  return (
    <NextLink
      {...linkProps}
      prefetch={dynamicOnHover ? null : prefetch}
      // @ts-expect-error
      unstable_dynamicOnHover={dynamicOnHover}
    />
  );
};

export default Link;
