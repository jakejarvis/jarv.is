import { createFileRoute } from "@tanstack/react-router";

import { PageTitle } from "@/components/layout/page-title";
import { createHead } from "@/lib/head";

export const Route = createFileRoute("/contact")({
  head: () =>
    createHead({
      title: "Contact Me",
      description: "Get in touch via email, Bluesky, or Mastodon.",
      canonical: "/contact",
    }),
  component: ContactPage,
});

function ContactPage() {
  return (
    <>
      <PageTitle canonical="/contact">Contact</PageTitle>

      <div className="prose prose-sm prose-neutral dark:prose-invert mx-auto max-w-2xl">
        <p>
          The best way to reach me is by email at{" "}
          <a href="mailto:jake@jarv.is" className="font-semibold">
            jake@jarv.is
          </a>
          .
        </p>
        <p>
          You can also send me a direct message on{" "}
          <a
            href="https://bsky.app/profile/jarv.is"
            target="_blank"
            rel="noopener noreferrer"
          >
            Bluesky
          </a>{" "}
          or{" "}
          <a
            href="https://fediverse.jarv.is/@jake"
            target="_blank"
            rel="noopener noreferrer"
          >
            Mastodon
          </a>
          .
        </p>
        <p>
          My PGP public key:{" "}
          <a
            href="https://keyoxide.org/hkp/3bc6e5776bf379d36f6714802b0c9cf251e69a39"
            target="_blank"
            rel="noopener"
            title="3BC6 E577 6BF3 79D3 6F67 1480 2B0C 9CF2 51E6 9A39"
            className="bg-muted relative rounded-sm px-[0.3rem] py-[0.2rem] font-mono text-sm font-medium tracking-wider [word-spacing:-0.25em]"
          >
            2B0C 9CF2 51E6 9A39
          </a>
        </p>
      </div>
    </>
  );
}
