import NextLink from "next/link";
import { cn } from "@/lib/utils";

const Link = ({ href, rel, target, className, ...rest }: React.ComponentProps<typeof NextLink>) => {
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
  };

  // don't waste time with next's component if it's just an external link
  if (isExternal) {
    return <a {...(linkProps as unknown as React.ComponentProps<"a">)} />;
  }

  return <NextLink {...linkProps} />;
};

export default Link;
