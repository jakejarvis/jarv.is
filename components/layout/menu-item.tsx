import Link from "@/components/link";
import { cn } from "@/lib/utils";

const MenuItem = ({
  text,
  href,
  icon,
  current,
  className,
  ...rest
}: React.ComponentProps<"div"> & {
  text?: string;
  href?: `/${string}`;
  icon: React.ReactNode;
  current?: boolean;
}) => {
  const item = (
    <div
      className={cn(
        "[&_svg]:stroke-foreground/85 inline-flex items-center [&_svg]:size-7 [&_svg]:md:size-5",
        className
      )}
      {...rest}
    >
      {icon}
      {text && <span className="ml-3 text-sm leading-none font-medium tracking-wide max-md:sr-only">{text}</span>}
    </div>
  );

  // allow both navigational links and/or other interactive react components (e.g. the theme toggle)
  if (href) {
    return (
      <Link
        href={href}
        aria-label={text}
        data-current={current || undefined}
        className="text-foreground/85 hover:border-b-ring/80 data-current:border-b-primary/60 inline-flex items-center hover:no-underline"
      >
        {item}
      </Link>
    );
  }

  return item;
};

export default MenuItem;
