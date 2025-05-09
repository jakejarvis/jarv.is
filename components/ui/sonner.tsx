"use client";

import { Toaster as Sonner, type ToasterProps } from "sonner";

const Toaster = ({ ...rest }: ToasterProps) => {
  return (
    <Sonner
      className="toaster group"
      style={
        {
          "--normal-bg": "var(--popover)",
          "--normal-text": "var(--popover-foreground)",
          "--normal-border": "var(--border)",
        } as React.CSSProperties
      }
      {...rest}
    />
  );
};

export default Toaster;
