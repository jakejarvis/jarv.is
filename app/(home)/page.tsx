import { ArrowUpRight } from "lucide-react";
import Image, { type StaticImageData } from "next/image";
import Link from "next/link";

import domainstackIcon from "./icons/domainstack.png";
import snoozleIcon from "./icons/snoozle.png";
import sofaIcon from "./icons/sofa.png";
import uiIcon from "./icons/ui.png";
import versioneerIcon from "./icons/versioneer.png";

type Project = {
  name: string;
  url: string;
  tagline: string;
  icon: StaticImageData;
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
    tagline: "An intentionally minimal React component library",
    icon: uiIcon,
  },
] as const;

const Page = () => (
  <>
    <h1 className="text-lg font-medium">
      Hi there! I&rsquo;m Jake.{" "}
      <span className="motion-safe:animate-wave ml-0.5 inline-block origin-[65%_80%] text-[1.2rem]">
        👋
      </span>
    </h1>

    <div className="markdown">
      <p className="text-sm leading-normal">
        I&rsquo;m a developer based in the{" "}
        <Link
          href="https://www.youtube-nocookie.com/embed/rLwbzGyC6t4?hl=en&amp;fs=1&amp;showinfo=1&amp;rel=0&amp;iv_load_policy=3"
          title='"Boston Accent Trailer - Late Night with Seth Meyers" on YouTube'
        >
          Boston
        </Link>{" "}
        area working on some cool stuff:
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
                  className="ring-border size-6 shrink-0 rounded-[26%] ring-1"
                />
                <span className="text-primary text-sm font-medium group-hover:underline group-hover:underline-offset-4">
                  {project.name}
                </span>
              </div>
              <span className="text-muted-foreground ml-9 text-xs text-pretty sm:ml-auto">
                {project.tagline}
                <ArrowUpRight
                  className="group-hover:text-primary ml-1 inline size-3.5 shrink-0 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
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

export default Page;
