"use client";

import { MoonIcon, SunIcon } from "lucide-react";
import { Link } from "@tanstack/react-router";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import avatarImg from "@/app/avatar.jpg";
import { GitHubIcon } from "@/components/icons";
import { Menu } from "@/components/layout/menu";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import authorConfig from "@/lib/config/author";
import siteConfig from "@/lib/config/site";
import { cn } from "@/lib/utils";

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
        className,
      )}
    >
      <header className="mx-auto flex w-full max-w-4xl items-center justify-between px-5 py-4">
        <div className="flex items-center gap-3">
          <Link
            to="/"
            rel="author"
            aria-label={siteConfig.name}
            className="flex shrink-0 items-center gap-2.5 pr-2 hover:text-foreground/85 hover:no-underline"
          >
            <img
              src={avatarImg}
              alt={`Photo of ${siteConfig.name}`}
              className="size-[40px] rounded-full border border-ring/30 md:size-[32px]"
              width={40}
              height={40}
            />
            <span className="whitespace-nowrap font-medium text-base tracking-tight max-md:sr-only">
              {siteConfig.name}
            </span>
          </Link>
          <Separator orientation="vertical" className="!h-6" />
          <Menu />
        </div>

        <div className="flex items-center gap-2.5">
          <Button
            variant="ghost"
            size="sm"
            aria-label="Open GitHub profile"
            asChild
          >
            <a
              href={`https://github.com/${authorConfig.social.github}`}
              target="_blank"
              rel="noopener noreferrer"
            >
              <GitHubIcon />
            </a>
          </Button>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setTheme(theme === "light" ? "dark" : "light")}
            aria-label="Toggle theme"
            className="group"
          >
            <SunIcon
              className="group-hover:stroke-orange-600 dark:hidden"
              aria-hidden="true"
            />
            <MoonIcon
              className="not-dark:hidden group-hover:stroke-yellow-400"
              aria-hidden="true"
            />
          </Button>
        </div>
      </header>
    </div>
  );
};

export { Header };
