import { env } from "@/lib/env";
import Link from "@/components/link";
import siteConfig from "@/lib/config/site";

const Footer = () => {
  return (
    <footer className="text-muted-foreground mt-8 w-full py-6 text-center text-[13px] leading-loose">
      Content{" "}
      <Link href="/license" prefetch={false}>
        licensed under {siteConfig.license}
      </Link>
      ,{" "}
      <Link href="/previously" prefetch={false} title="Previously on...">
        {siteConfig.copyrightYearStart}
      </Link>{" "}
      – 2026.{" "}
      <Link
        href={`https://github.com/${env.NEXT_PUBLIC_GITHUB_REPO}`}
        title="View Source on GitHub"
        className="font-medium underline underline-offset-4"
      >
        View source.
      </Link>
    </footer>
  );
};

export default Footer;
