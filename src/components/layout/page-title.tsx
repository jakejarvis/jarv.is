import { Link } from "@tanstack/react-router";

import { cn } from "@/lib/utils";

const linkClassName =
  "text-foreground no-underline before:tracking-wider before:text-muted-foreground before:content-['./']";

const PageTitle = ({
  canonical,
  className,
  children,
  ...rest
}: React.ComponentProps<"h1"> & {
  canonical: string;
}) => (
  <h1
    className={cn("not-prose mt-0 mb-6 text-left text-2xl font-medium lowercase", className)}
    {...rest}
  >
    {canonical.startsWith("/") ? (
      <Link to={canonical} className={linkClassName}>
        {children}
      </Link>
    ) : (
      <a href={canonical} className={linkClassName}>
        {children}
      </a>
    )}
  </h1>
);

export { PageTitle };
