import { env } from "@/lib/env";
import { HeartIcon } from "lucide-react";
import Link from "@/components/link";
import { cn } from "@/lib/utils";
import siteConfig from "@/lib/config/site";
import type { ComponentPropsWithoutRef } from "react";

const Footer = ({ className, ...rest }: ComponentPropsWithoutRef<"footer">) => {
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
        – {new Date().getUTCFullYear()}.
      </div>

      <div>
        Made with{" "}
        <HeartIcon className="animate-heartbeat stroke-destructive fill-destructive mx-[1px] inline size-4 align-text-top" />{" "}
        and{" "}
        <Link
          href="https://nextjs.org/"
          title="Powered by Next.js"
          aria-label="Next.js"
          className="text-foreground/85 hover:text-foreground/60 hover:no-underline"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="currentColor"
            stroke="currentColor"
            strokeWidth="0"
            viewBox="0 0 24 24"
            className="mx-[1px] inline size-4 align-text-top"
          >
            <path d="M18.665 21.978C16.758 23.255 14.465 24 12 24 5.377 24 0 18.623 0 12S5.377 0 12 0s12 5.377 12 12c0 3.583-1.574 6.801-4.067 9.001L9.219 7.2H7.2v9.596h1.615V9.251l9.85 12.727Zm-3.332-8.533 1.6 2.061V7.2h-1.6v6.245Z" />
          </svg>
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
