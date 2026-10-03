"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import siteConfig from "@/lib/config/site";
import { cn } from "@/lib/utils";

/** Site name/avatar link; needs the current pathname to pick a view transition type. */
const HomeLink = ({ children }: { children: React.ReactNode }) => {
  const pathname = usePathname();

  return (
    <Link
      href="/"
      rel="author"
      transitionTypes={pathname === "/" ? undefined : ["nav-lateral"]}
      aria-label={siteConfig.name}
      className={cn(
        "flex shrink-0 items-center hover:text-foreground/85",
        "gap-2.5 pr-2 hover:no-underline",
      )}
    >
      {children}
    </Link>
  );
};

export { HomeLink };
