import Link from "@/components/link";
import { cn } from "@/lib/utils";

const PageTitle = ({
  canonical,
  className,
  children,
  ...rest
}: React.ComponentProps<"h1"> & {
  canonical: string;
}) => {
  return (
    <h1 className={cn("mt-0 mb-6 text-left text-3xl font-semibold tracking-tight lowercase", className)} {...rest}>
      <Link
        href={canonical}
        className="before:text-muted-foreground no-underline before:mr-[-3px] before:tracking-wider before:content-['\002E\002F']"
      >
        {children}
      </Link>
    </h1>
  );
};

export default PageTitle;
