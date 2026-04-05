import { createFileRoute } from "@tanstack/react-router";

import screenshotImg from "@/app/cli/screenshot.png";
import { PageTitle } from "@/components/layout/page-title";
import { createHead } from "@/lib/head";

export const Route = createFileRoute("/cli")({
  head: () =>
    createHead({
      title: "CLI",
      description: "AKA, the most useless Node module ever published, in history, by anyone, ever.",
      canonical: "/cli",
    }),
  component: CliPage,
});

function CliPage() {
  return (
    <>
      <PageTitle canonical="/cli">CLI</PageTitle>
      <div className="prose prose-neutral dark:prose-invert prose-sm max-w-none">
        <blockquote>
          <p>
            The{" "}
            <a href="https://jarv.is/" target="_blank" rel="noopener noreferrer">
              Jake Jarvis
            </a>{" "}
            CLI (aka the most useless Node module ever published, in history, by anyone, ever).
          </p>
        </blockquote>

        <img src={screenshotImg} alt="Terminal Screenshot" />

        <h2>Usage</h2>
        <pre>
          <code>npx @jakejarvis/cli</code>
        </pre>

        <h2>Inspired by</h2>
        <ul>
          <li>
            <a
              href="https://github.com/sindresorhus/sindresorhus-cli"
              target="_blank"
              rel="noopener noreferrer"
            >
              @sindresorhus/sindresorhus-cli
            </a>
          </li>
          <li>
            <a href="https://github.com/yg/ygcodes" target="_blank" rel="noopener noreferrer">
              @yg/ygcodes
            </a>
          </li>
        </ul>

        <h2>Built with</h2>
        <ul>
          <li>
            <a href="https://github.com/vadimdemedes/ink" target="_blank" rel="noopener noreferrer">
              ink
            </a>{" "}
            &ndash; React for interactive command-line apps
          </li>
          <li>
            <a
              href="https://github.com/sindresorhus/meow"
              target="_blank"
              rel="noopener noreferrer"
            >
              meow
            </a>{" "}
            &ndash; CLI helper
          </li>
        </ul>

        <p>
          <a
            href="https://github.com/jakejarvis/jakejarvis/tree/main/cli"
            target="_blank"
            rel="noopener noreferrer"
          >
            View source on GitHub.
          </a>
        </p>

        <h2>License</h2>
        <p>
          MIT &copy;{" "}
          <a href="https://jarv.is/" target="_blank" rel="noopener noreferrer">
            Jake Jarvis
          </a>
          ,{" "}
          <a href="https://sindresorhus.com/" target="_blank" rel="noopener noreferrer">
            Sindre Sorhus
          </a>
        </p>
      </div>
    </>
  );
}
