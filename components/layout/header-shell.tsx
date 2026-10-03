"use client";

import { useEffect, useState } from "react";

import { cn } from "@/lib/utils";

/** Sticky header wrapper that gains a background once the page is scrolled. */
const HeaderShell = ({
  className,
  children,
}: {
  className?: string;
  children: React.ReactNode;
}) => {
  const [isScrolled, setIsScrolled] = useState(false);

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
      style={{ viewTransitionName: "persistent-nav" }}
      className={cn(
        "sticky top-0 z-50 w-full",
        "motion-safe:transition-[background-color,backdrop-filter,border-color]",
        "motion-safe:duration-200",
        "bg-background/0 backdrop-blur-none",
        "data-[scrolled=true]:bg-background/80",
        "data-[scrolled=true]:backdrop-blur-md",
        "data-[scrolled=true]:border-b data-[scrolled=true]:border-border/70",
        className,
      )}
    >
      {children}
    </div>
  );
};

export { HeaderShell };
