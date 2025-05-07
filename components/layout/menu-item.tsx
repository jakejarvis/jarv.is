import Link from "@/components/link";
import { cn } from "@/lib/utils";
import type { ComponentPropsWithoutRef } from "react";
import type { MenuItemConfig } from "@/lib/config/menu";

const MenuItem = ({
  text,
  href,
  icon,
  current,
  className,
  ...rest
}: Omit<ComponentPropsWithoutRef<typeof Link>, "href"> &
  MenuItemConfig & {
    current?: boolean;
  }) => {
  const Icon = icon;

  const item = (
    <>
      {Icon && <Icon className="stroke-foreground/85 block h-7 w-7 md:h-5 md:w-5" />}
      {text && <span className="ml-3 text-sm leading-none font-medium tracking-wide max-md:sr-only">{text}</span>}
    </>
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
          "text-foreground/85 hover:border-ring data-current:border-primary/40! -mb-[3px] inline-flex items-center p-2.5 hover:border-b-[3px] hover:no-underline data-current:border-b-[3px]",
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
