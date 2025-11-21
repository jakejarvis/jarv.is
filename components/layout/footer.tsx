"use client";

import { Suspense } from "react";
import { env } from "@/lib/env";
import { HeartIcon } from "lucide-react";
import Link from "@/components/link";
import { NextjsIcon } from "@/components/icons";
import { cn } from "@/lib/utils";
import siteConfig from "@/lib/config/site";

const CurrentYear = () => {
  return <>{new Date().getUTCFullYear()}</>;
};

const Footer = ({ className, ...rest }: React.ComponentProps<"footer">) => {
  return (
    <footer
      className={cn("text-foreground/85 text-[0.8rem] leading-loose md:flex md:flex-row md:justify-between", className)}
      {...rest}
    >
      <div>
        Content{" "}
        <Link href="/license" className="text-foreground/85 hover:no-underline">
          licensed under {siteConfig.license}
        </Link>
        ,{" "}
        <Link href="/previously" title="Previously on..." className="text-foreground/85 hover:no-underline">
          {siteConfig.copyrightYearStart}
        </Link>{" "}
        –{" "}
        <Suspense fallback={siteConfig.copyrightYearStart}>
          <CurrentYear />
        </Suspense>
        .
      </div>

      <div>
        Made with{" "}
        <HeartIcon className="animate-heartbeat stroke-destructive fill-destructive mx-px inline size-4 align-text-top" />{" "}
        and{" "}
        <Link
          href="https://nextjs.org/"
          title="Powered by Next.js"
          aria-label="Next.js"
          className="text-foreground/85 hover:text-foreground/60 hover:no-underline"
        >
          <NextjsIcon className="mx-px inline size-4 align-text-top" />
        </Link>
        .{" "}
        <Link
          href={`https://github.com/${env.NEXT_PUBLIC_GITHUB_REPO}`}
          title="View Source on GitHub"
          className="border-muted-foreground text-foreground/85 hover:border-muted-foreground/60 border-b-1 pb-0.5 hover:no-underline"
        >
          View source.
        </Link>
      </div>
    </footer>
  );
};

export default Footer;
