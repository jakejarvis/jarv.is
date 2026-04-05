import { createFileRoute } from "@tanstack/react-router";
import { PageTitle } from "@/components/layout/page-title";
import { createHead } from "@/lib/head";

export const Route = createFileRoute("/privacy")({
  head: () =>
    createHead({
      title: "Privacy",
      description: "This website's extremely simple privacy policy.",
      canonical: "/privacy",
    }),
  component: PrivacyPage,
});

function PrivacyPage() {
  return (
    <>
      <PageTitle canonical="/privacy">Privacy</PageTitle>
      <div className="prose prose-neutral dark:prose-invert prose-sm max-w-none">
        <p>Okay, this is an easy one. 😉</p>

        <h2>Hosting</h2>
        <p>
          Pages and first-party assets on this website are served by{" "}
          <a
            href="https://vercel.com/"
            target="_blank"
            rel="noopener noreferrer"
          >
            <strong>▲ Vercel</strong>
          </a>
          . Refer to their{" "}
          <a
            href="https://vercel.com/legal/privacy-policy"
            target="_blank"
            rel="noopener noreferrer"
          >
            privacy policy
          </a>{" "}
          for more information.
        </p>
        <p>
          For a likely excessive level of privacy and security, this website
          is also mirrored on the{" "}
          <a
            href="https://www.torproject.org/"
            target="_blank"
            rel="noopener noreferrer"
          >
            🧅 Tor network
          </a>{" "}
          at:
        </p>
        <blockquote>
          <p>
            <a href="http://jarvis2i2vp4j4tbxjogsnqdemnte5xhzyi7hziiyzxwge3hzmh57zad.onion/">
              <strong>
                jarvis2i2vp4j4tbxjogsnqdemnte5xhzyi7hziiyzxwge3hzmh57zad.onion
              </strong>
            </a>
          </p>
        </blockquote>

        <h2>Analytics</h2>
        <p>
          A very simple hit counter on each blog post tallies an aggregate
          number of pageviews (i.e. <code>hits = hits + 1</code>) in a{" "}
          <a
            href="https://planetscale.com/"
            target="_blank"
            rel="noopener noreferrer"
          >
            Planetscale Postgres
          </a>{" "}
          database. Individual views and identifying (or non-identifying)
          details are <strong>never stored or logged</strong>.
        </p>
        <p>
          The{" "}
          <a
            href="https://github.com/jakejarvis/jarv.is/blob/main/components/view-counter.tsx"
            target="_blank"
            rel="noopener noreferrer"
          >
            server component
          </a>{" "}
          and{" "}
          <a
            href="https://github.com/jakejarvis/jarv.is/blob/main/app/api/hits/route.ts"
            target="_blank"
            rel="noopener noreferrer"
          >
            API endpoint
          </a>{" "}
          are open source, and{" "}
          <a
            href="https://github.com/jakejarvis/website-stats"
            target="_blank"
            rel="noopener noreferrer"
          >
            snapshots of the database
          </a>{" "}
          are public.
        </p>
        <p>
          <a
            href="https://vercel.com/docs/analytics"
            target="_blank"
            rel="noopener noreferrer"
          >
            <strong>Vercel Analytics</strong>
          </a>{" "}
          is also used to gain insights into referrers, search terms, etc.{" "}
          <a
            href="https://vercel.com/docs/analytics/privacy-policy"
            target="_blank"
            rel="noopener noreferrer"
          >
            without collecting anything identifiable
          </a>{" "}
          about you.
        </p>

        <h2>Comments</h2>
        <p>
          Post comments are similarly stored in a Postgres database.
          Authentication is provided via GitHub, from which the
          account&rsquo;s username, email, and avatar URL are stored.
        </p>

        <h2>Third-Party Content</h2>
        <p>
          Occasionally, embedded content from third-party services is
          included in posts, and some may contain tracking code that is
          outside of my control. Please refer to their privacy policies for
          more information:
        </p>
        <ul>
          <li>
            <a
              href="https://blog.codepen.io/documentation/privacy/"
              target="_blank"
              rel="noopener noreferrer"
            >
              CodePen
            </a>
          </li>
          <li>
            <a
              href="https://docs.github.com/en/github/site-policy/github-privacy-statement"
              target="_blank"
              rel="noopener noreferrer"
            >
              GitHub
            </a>
          </li>
          <li>
            <a
              href="https://twitter.com/en/privacy"
              target="_blank"
              rel="noopener noreferrer"
            >
              Twitter
            </a>
          </li>
          <li>
            <a
              href="https://vimeo.com/privacy"
              target="_blank"
              rel="noopener noreferrer"
            >
              Vimeo
            </a>
          </li>
          <li>
            <a
              href="https://policies.google.com/privacy"
              target="_blank"
              rel="noopener noreferrer"
            >
              YouTube
            </a>
          </li>
        </ul>

        <h2>Fighting Spam</h2>
        <p>
          Form submissions on this site are protected by Vercel&rsquo;s{" "}
          <a
            href="https://vercel.com/blog/introducing-botid"
            target="_blank"
            rel="noopener noreferrer"
          >
            BotID
          </a>{" "}
          deep analysis. Refer to{" "}
          <a
            href="https://vercel.com/legal/privacy-policy"
            target="_blank"
            rel="noopener noreferrer"
          >
            Vercel&rsquo;s
          </a>{" "}
          and{" "}
          <a
            href="https://www.kasada.io/privacy-policy/"
            target="_blank"
            rel="noopener noreferrer"
          >
            Kasada&rsquo;s
          </a>{" "}
          privacy policies for details.
        </p>
      </div>
    </>
  );
}
