import Link from "next/link";
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
      "not-prose mt-0 mb-6 text-left font-medium text-3xl lowercase tracking-tight",
      className,
    )}
    {...rest}
  >
    <Link
      href={canonical}
      className="text-foreground no-underline before:mr-[-3px] before:text-muted-foreground before:tracking-wider before:content-['\002E\002F']"
    >
      {children}
    </Link>
  </h1>
);

export { PageTitle };
