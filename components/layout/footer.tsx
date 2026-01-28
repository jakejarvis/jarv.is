import { env } from "@/lib/env";
import Link from "next/link";
import siteConfig from "@/lib/config/site";

const Footer = () => {
  return (
    <footer className="text-muted-foreground mt-8 w-full py-6 text-center text-[13px] leading-loose">
      All content is licensed under{" "}
      <Link href="/license" className="underline underline-offset-4">
        {siteConfig.license}
      </Link>
      . Code is{" "}
      <a
        href={`https://github.com/${env.NEXT_PUBLIC_GITHUB_REPO}`}
        target="_blank"
        rel="noopener noreferrer"
        title="View Source on GitHub"
        className="underline underline-offset-4"
      >
        open source
      </a>
      .
    </footer>
  );
};

export { Footer };
