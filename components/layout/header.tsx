"use client";

import { useState, useEffect } from "react";
import { useTheme } from "next-themes";
import Image from "next/image";
import Link from "@/components/link";
import Button from "@/components/ui/button";
import Separator from "@/components/ui/separator";
import Menu from "@/components/layout/menu";
import { GitHubIcon } from "@/components/icons";
import { cn } from "@/lib/utils";
import authorConfig from "@/lib/config/author";
import siteConfig from "@/lib/config/site";
import { MoonIcon, SunIcon } from "lucide-react";

import avatarImg from "@/app/avatar.jpg";

const Header = ({ className }: { className?: string }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const { theme, setTheme } = useTheme();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    // Check initial scroll position
    handleScroll();

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div
      data-scrolled={isScrolled}
      className={cn(
        "sticky top-0 z-50 w-full",
        "motion-safe:transition-[background-color,backdrop-filter,border-color] motion-safe:duration-200",
        "bg-background/0 backdrop-blur-none",
        "data-[scrolled=true]:bg-background/80 data-[scrolled=true]:backdrop-blur-md",
        "data-[scrolled=true]:border-border/50 data-[scrolled=true]:border-b",
        className
      )}
    >
      <header className="mx-auto flex w-full max-w-4xl items-center justify-between px-5 py-4">
        <div className="flex items-center gap-3">
          <Link
            href="/"
            rel="author"
            aria-label={siteConfig.name}
            className="hover:text-foreground/85 flex shrink-0 items-center gap-2.5 pr-2 hover:no-underline"
          >
            <Image
              src={avatarImg}
              alt={`Photo of ${siteConfig.name}`}
              className="border-ring/30 size-[40px] rounded-full border md:size-[32px]"
              width={40}
              height={40}
              quality={75}
              priority
            />
            <span className="text-[17px] font-medium whitespace-nowrap max-md:sr-only">{siteConfig.name}</span>
          </Link>
          <Separator orientation="vertical" className="!h-6" />
          <Menu />
        </div>

        <div className="flex items-center gap-2">
          <Button variant="ghost" size="sm" aria-label="Open GitHub profile" asChild>
            <Link href={`https://github.com/${authorConfig.social.github}`}>
              <GitHubIcon />
            </Link>
          </Button>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setTheme(theme === "light" ? "dark" : "light")}
            aria-label="Toggle theme"
            className="group"
          >
            <SunIcon className="group-hover:stroke-orange-600 dark:hidden" aria-hidden="true" />
            <MoonIcon className="not-dark:hidden group-hover:stroke-yellow-400" aria-hidden="true" />
          </Button>
        </div>
      </header>
    </div>
  );
};

export default Header;
