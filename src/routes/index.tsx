import { IconArrowUpRight } from "@tabler/icons-react";
import { createFileRoute } from "@tanstack/react-router";

import clickerIcon from "@/assets/icons/clicker.png";
import domainstackIcon from "@/assets/icons/domainstack.png";
import snoozleIcon from "@/assets/icons/snoozle.png";
import sofaIcon from "@/assets/icons/sofa.png";
import stanzaIcon from "@/assets/icons/stanza.png";
import uiIcon from "@/assets/icons/ui.png";
import versioneerIcon from "@/assets/icons/versioneer.png";
import { Image } from "@/components/image";
import { createHead } from "@/lib/metadata";

type Project = {
  name: string;
  url: string;
  tagline: string;
  icon: string;
};

const projects: readonly Project[] = [
  {
    name: "Domainstack",
    url: "https://domainstack.io",
    tagline: "Domain intelligence made easy",
    icon: domainstackIcon,
  },
  {
    name: "Sofa",
    url: "https://sofa.watch",
    tagline: "Self-hosted movie & TV show tracker",
    icon: sofaIcon,
  },
  {
    name: "Clicker",
    url: "https://clicker.jarv.is",
    tagline: "The missing Apple TV remote for macOS",
    icon: clickerIcon,
  },
  {
    name: "Stanza",
    url: "https://stanza.tools",
    tagline: "shadcn/ui for infrastructure",
    icon: stanzaIcon,
  },
  {
    name: "Versioneer",
    url: "https://versioneer.app",
    tagline: "macOS app updater with privacy-friendly crowdsourcing",
    icon: versioneerIcon,
  },
  {
    name: "Snoozle",
    url: "https://snoozle.ai",
    tagline: "AI-powered bedtime stories for kids",
    icon: snoozleIcon,
  },
  {
    name: "jarvis-ui",
    url: "https://ui.jarv.is",
    tagline: "Intentionally random React component library",
    icon: uiIcon,
  },
] as const;

const Page = () => (
  <>
    <h1 className="text-lg font-medium">
      Hi there! I&rsquo;m Jake.{" "}
      <span className="ml-0.5 inline-block origin-[65%_80%] text-[1.2rem] motion-safe:animate-wave">
        👋
      </span>
    </h1>

    <div className="markdown">
      <p className="text-sm leading-normal">
        I&rsquo;m a developer based in the Boston area working on some cool stuff:
      </p>
    </div>

    <section className="my-3">
      <ul className="flex flex-col gap-2 sm:gap-3">
        {projects.map((project) => (
          <li key={project.name}>
            <a
              href={project.url}
              target="_blank"
              rel="noopener noreferrer"
              className="group flex flex-col gap-1 rounded-md py-1 transition-colors sm:flex-row sm:items-center sm:gap-4"
            >
              <div className="flex items-center gap-3">
                <Image
                  src={project.icon}
                  alt={project.name}
                  width={64}
                  height={64}
                  decoding="async"
                  className="size-6 shrink-0 rounded-[26%] ring-1 ring-border"
                />
                <span className="text-sm font-medium tracking-[-0.0125em] text-primary group-hover:underline group-hover:underline-offset-4">
                  {project.name}
                </span>
              </div>
              <span className="ml-9 text-xs text-muted-foreground sm:ml-auto">
                {project.tagline}
                <IconArrowUpRight
                  className="ml-1 inline size-3.5 shrink-0 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-primary"
                  aria-hidden="true"
                />
              </span>
            </a>
          </li>
        ))}
      </ul>
    </section>
  </>
);

export const Route = createFileRoute("/")({
  head: () => createHead({ canonical: "/" }),
  component: Page,
});
