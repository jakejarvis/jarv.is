import Link from "@/components/link";
import { cn } from "@/lib/utils";
import type { ComponentPropsWithoutRef } from "react";
import type { LucideIcon } from "lucide-react";

const MenuItem = ({
  text,
  href,
  icon,
  current,
  className,
  ...rest
}: Omit<ComponentPropsWithoutRef<typeof Link>, "href"> & {
  text?: string;
  href?: string;
  icon?: LucideIcon;
  current?: boolean;
}) => {
  const Icon = icon;

  const item = (
    <>
      {Icon && <Icon className="stroke-foreground/85 block size-[28px] md:size-[20px]" />}
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
          "text-foreground/85 hover:border-ring -mb-[3px] inline-flex items-center p-2.5 hover:border-b-[3px] hover:no-underline",
          current && "border-primary/40 hover:border-primary/40 border-b-[3px]",
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
