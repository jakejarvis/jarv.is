import { isValidElement } from "react";
import Link from "@/components/link";
import { cn } from "@/lib/utils";

const MenuItem = ({
  text,
  href,
  icon,
  current,
  className,
  ...rest
}: Omit<React.ComponentProps<typeof Link>, "href"> & {
  text?: string;
  href?: `/${string}`;
  icon?: React.ReactNode;
  current?: boolean;
}) => {
  const item = (
    <div className="[&_svg]:stroke-foreground/85 inline-flex items-center [&_svg]:size-7 [&_svg]:md:size-5">
      {isValidElement(icon) && icon}
      {text && <span className="ml-3 text-sm leading-none font-medium tracking-wide max-md:sr-only">{text}</span>}
    </div>
  );

  // allow both navigational links and/or other interactive react components (e.g. the theme toggle)
  if (href) {
    return (
      <Link
        dynamicOnHover
        href={href}
        aria-label={text}
        data-current={current || undefined}
        className={cn(
          "text-foreground/85 hover:border-ring data-current:border-primary/40! inline-flex items-center hover:border-b-[3px] hover:no-underline data-current:border-b-[3px]",
          className
        )}
        {...rest}
      >
        {item}
      </Link>
    );
  }

  return item;
};

export default MenuItem;
