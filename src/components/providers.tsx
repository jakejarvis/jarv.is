"use client";

import { ThemeProvider } from "@/components/theme-provider";
import { TooltipProvider } from "@/components/ui/tooltip";

const Providers = ({ children }: { children: React.ReactNode }) => (
  <ThemeProvider>
    <TooltipProvider>{children}</TooltipProvider>
  </ThemeProvider>
);

export { Providers };
