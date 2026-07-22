import Link from "next/link";

import siteConfig from "@/lib/config/site";

const Footer = () => (
  <footer
    style={{ viewTransitionName: "persistent-footer" }}
    className="mt-8 w-full border-t border-border py-6 text-xs leading-loose text-muted-foreground"
  >
    All content is licensed under{" "}
    <Link href="/license" className="underline underline-offset-2">
      {siteConfig.license}
    </Link>
    . View source on{" "}
    <a
      href={`https://github.com/${process.env.NEXT_PUBLIC_GITHUB_REPO}`}
      target="_blank"
      rel="noopener noreferrer"
      className="underline underline-offset-2"
    >
      GitHub
    </a>
    .
  </footer>
);

export { Footer };
