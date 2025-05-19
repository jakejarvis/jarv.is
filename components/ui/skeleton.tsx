import { cn } from "@/lib/utils";

const Skeleton = ({ className, ...rest }: React.ComponentProps<"div">) => {
  return <div data-slot="skeleton" className={cn("bg-accent animate-pulse rounded-md", className)} {...rest} />;
};

export default Skeleton;
