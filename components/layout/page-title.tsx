import Link from "@/components/link";
import { cn } from "@/lib/utils";
import type { ComponentPropsWithoutRef } from "react";

const PageTitle = ({
  canonical,
  className,
  children,
  ...rest
}: ComponentPropsWithoutRef<"h1"> & {
  canonical: string;
}) => {
  return (
    <h1 className={cn("mt-0 mb-6 text-left text-3xl font-medium -tracking-[0.015em] lowercase", className)} {...rest}>
      <Link
        href={canonical}
        className="before:text-muted-foreground before:-mr-0.5 before:tracking-widest before:content-['\002E\002F'] hover:no-underline"
      >
        {children}
      </Link>
    </h1>
  );
};

export default PageTitle;
