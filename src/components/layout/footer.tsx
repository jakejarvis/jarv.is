import { Link } from "@tanstack/react-router";

import siteConfig from "@/lib/config/site";

const Footer = () => (
  <footer className="mt-8 w-full border-t border-border py-6 text-xs leading-loose text-muted-foreground">
    All content is licensed under{" "}
    <Link to="/license" className="underline underline-offset-2">
      {siteConfig.license}
    </Link>
    . View source on{" "}
    <a
      href={`https://github.com/${import.meta.env.VITE_GITHUB_REPO}`}
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
