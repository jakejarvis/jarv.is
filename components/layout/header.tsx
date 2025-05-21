import Image from "next/image";
import Link from "@/components/link";
import Menu from "@/components/layout/menu";
import { cn } from "@/lib/utils";
import siteConfig from "@/lib/config/site";

import avatarImg from "@/app/avatar.jpg";

const Header = ({ className, ...rest }: React.ComponentProps<"header">) => {
  return (
    <header className={cn("flex items-center justify-between", className)} {...rest}>
      <Link
        dynamicOnHover
        href="/"
        rel="author"
        aria-label={siteConfig.name}
        className="hover:text-primary text-foreground/85 flex shrink-0 items-center hover:no-underline"
      >
        <Image
          src={avatarImg}
          alt={`Photo of ${siteConfig.name}`}
          className="border-ring/40 size-[64px] rounded-full border-2 md:size-[48px] md:border-1"
          width={64}
          height={64}
          quality={50}
          priority
        />
        <span className="mx-3 text-xl leading-none font-medium tracking-[0.01rem] max-md:sr-only">
          {siteConfig.name}
        </span>
      </Link>

      <Menu className="w-full max-w-64 sm:max-w-96 md:max-w-none" />
    </header>
  );
};

export default Header;
