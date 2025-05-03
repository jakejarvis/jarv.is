import Link from "@/components/link";
import { cn } from "@/lib/utils";
import type { ComponentPropsWithoutRef } from "react";

export type PageTitleProps = ComponentPropsWithoutRef<"h1"> & {
  canonical: string;
};

const PageTitle = ({ canonical, className, children, ...rest }: PageTitleProps) => {
  return (
    <h1 className={cn("mt-0 mb-6 text-left text-3xl font-medium lowercase", className)} {...rest}>
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
