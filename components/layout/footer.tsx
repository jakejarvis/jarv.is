import Link from "next/link";

import siteConfig from "@/lib/config/site";

const Footer = () => (
  <footer className="text-muted-foreground mt-8 w-full py-6 text-center text-[13px] leading-loose">
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
