import { Link } from "@tanstack/react-router";

import siteConfig from "@/lib/config/site";

const GITHUB_REPO = import.meta.env.VITE_GITHUB_REPO || "jakejarvis/jarv.is";

const Footer = () => (
  <footer className="mt-8 w-full py-6 text-center text-[13px] text-muted-foreground leading-loose">
    All content is licensed under{" "}
    <Link to="/license" className="underline underline-offset-4">
      {siteConfig.license}
    </Link>
    . View source on{" "}
    <a
      href={`https://github.com/${GITHUB_REPO}`}
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
