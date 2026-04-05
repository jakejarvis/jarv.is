"use client";

import { Link } from "@tanstack/react-router";
import { AtSignIcon, MoonIcon, SunIcon } from "lucide-react";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

import { GitHubIcon } from "@/components/icons";
import { Image } from "@/components/image";
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
      <header className="mx-auto mt-2 flex w-full max-w-[720px] items-center justify-between px-5 py-4">
        <div className="flex items-center gap-3">
          <Link
            to="/"
            rel="author"
            aria-label={siteConfig.name}
            className="hover:text-foreground/85 flex shrink-0 items-center gap-2.5 pr-2 hover:no-underline"
          >
            <Image
              src="/avatar.jpg"
              alt={`Photo of ${siteConfig.name}`}
              width={32}
              height={32}
              layout="fixed"
              priority
              className="border-ring/30 rounded-full border"
            />
            <span className="text-base font-medium tracking-tight whitespace-nowrap max-md:sr-only">
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
            aria-label="Send email"
            render={<a href={`mailto:${authorConfig.email}`} />}
          >
            <AtSignIcon />
          </Button>
          <Button
            variant="ghost"
            size="sm"
            aria-label="Open GitHub profile"
            render={
              <a
                href={`https://github.com/${authorConfig.social.github}`}
                target="_blank"
                rel="noopener noreferrer"
              />
            }
          >
            <GitHubIcon />
          </Button>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setTheme(theme === "light" ? "dark" : "light")}
            aria-label="Toggle theme"
            className="group"
          >
            <SunIcon className="group-hover:stroke-orange-600 dark:hidden" aria-hidden="true" />
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
