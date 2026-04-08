import Link from "next/link";

import siteConfig from "@/lib/config/site";

const Footer = () => (
  <footer className="text-muted-foreground border-border mt-8 w-full border-t py-6 text-xs leading-loose">
    All content is licensed under{" "}
    <Link href="/license" className="underline underline-offset-4">
      {siteConfig.license}
    </Link>
    . View source on{" "}
    <a
      href={`https://github.com/${process.env.NEXT_PUBLIC_GITHUB_REPO}`}
      target="_blank"
      rel="noopener noreferrer"
      className="underline underline-offset-4"
    >
      GitHub
    </a>
    .
  </footer>
);

export { Footer };
