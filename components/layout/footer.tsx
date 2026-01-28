import { env } from "@/lib/env";
import Link from "next/link";
import siteConfig from "@/lib/config/site";

const Footer = () => {
  return (
    <footer className="text-muted-foreground mt-8 w-full py-6 text-center text-[13px] leading-loose">
      Content <Link href="/license">licensed under {siteConfig.license}</Link>,{" "}
      <Link href="/previously" title="Previously on...">
        {siteConfig.copyrightYearStart}
      </Link>{" "}
      – 2026.{" "}
      <a
        href={`https://github.com/${env.NEXT_PUBLIC_GITHUB_REPO}`}
        target="_blank"
        rel="noopener noreferrer"
        title="View Source on GitHub"
        className="font-medium underline underline-offset-4"
      >
        View source.
      </a>
    </footer>
  );
};

export default Footer;
