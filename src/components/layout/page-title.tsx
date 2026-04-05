import { Link } from "@tanstack/react-router";

import { cn } from "@/lib/utils";

const PageTitle = ({
  canonical,
  className,
  children,
  ...rest
}: React.ComponentProps<"h1"> & {
  canonical: string;
}) => (
  <h1
    className={cn(
      "not-prose mt-0 mb-6 text-left text-3xl font-medium tracking-tight lowercase",
      className,
    )}
    {...rest}
  >
    <Link
      to={canonical}
      className="text-foreground before:text-muted-foreground no-underline before:tracking-wider before:content-['./']"
    >
      {children}
    </Link>
  </h1>
);

export { PageTitle };
