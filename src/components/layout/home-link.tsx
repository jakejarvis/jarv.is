import { Link } from "@tanstack/react-router";

import siteConfig from "@/lib/config/site";
import { cn } from "@/lib/utils";

/** Site name/avatar link. */
const HomeLink = ({ children }: { children: React.ReactNode }) => (
  <Link
    to="/"
    rel="author"
    aria-label={siteConfig.name}
    className={cn(
      "flex shrink-0 items-center hover:text-foreground/85",
      "gap-2.5 pr-2 hover:no-underline",
    )}
  >
    {children}
  </Link>
);

export { HomeLink };
