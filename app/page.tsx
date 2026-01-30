import Link from "next/link";
import { LockIcon } from "lucide-react";
import { cn } from "@/lib/utils";

const Page = () => {
  return (
    <div
      className={cn(
        "prose prose-neutral dark:prose-invert prose-sm max-w-none",
        "prose-headings:font-semibold prose-headings:text-primary prose-headings:tracking-tight prose-headings:mt-0 prose-headings:mb-3",
        "prose-p:text-foreground/90 prose-p:my-3 prose-p:leading-[1.75] md:prose-p:leading-relaxed prose-strong:text-primary prose-li:text-foreground/80",
        "prose-a:text-primary prose-a:font-medium prose-a:underline prose-a:underline-offset-4",
        "prose-code:bg-muted prose-code:text-foreground prose-code:px-1 prose-code:py-0.5 prose-code:rounded-sm prose-code:text-[0.9em] prose-code:before:content-none prose-code:after:content-none",
        "[&_table]:!border-[color:var(--border)] [&_td]:!border-[color:var(--border)] [&_th]:!border-[color:var(--border)]"
      )}
    >
      <h1 className="text-2xl font-medium">
        Hi there! I&rsquo;m Jake.{" "}
        <span className="motion-safe:animate-wave ml-0.5 inline-block origin-[65%_80%] text-2xl">👋</span>
      </h1>

      <h2 className="font-normal">
        I&rsquo;m a frontend web developer based in the{" "}
        <Link
          href="https://www.youtube-nocookie.com/embed/rLwbzGyC6t4?hl=en&amp;fs=1&amp;showinfo=1&amp;rel=0&amp;iv_load_policy=3"
          title='"Boston Accent Trailer - Late Night with Seth Meyers" on YouTube'
        >
          Boston
        </Link>{" "}
        area.
      </h2>

      <p>
        I specialize in using TypeScript, React, and Next.js to make lightweight frontends with dynamic and powerful
        backends.
      </p>

      <p>
        Whenever possible, I also apply my experience in{" "}
        <a
          href="https://bugcrowd.com/jakejarvis"
          title="Jake Jarvis on Bugcrowd"
          target="_blank"
          rel="noopener noreferrer"
        >
          information security
        </a>{" "}
        and{" "}
        <a
          href="https://github.com/jakejarvis?tab=repositories&q=github-actions&type=&language=&sort=stargazers"
          title='My repositories tagged with "github-actions" on GitHub'
          target="_blank"
          rel="noopener noreferrer"
        >
          devops
        </a>
        .
      </p>

      <p>
        I fell in love with{" "}
        <Link href="/previously" title="My Terrible, Horrible, No Good, Very Bad First Websites">
          frontend web design
        </Link>{" "}
        and{" "}
        <Link href="/notes/my-first-code" title="Jake's Bulletin Board, circa 2003">
          backend coding
        </Link>{" "}
        when my only source of income was{" "}
        <Link
          href="/birthday"
          title="🎉 Cranky Birthday Boy on VHS Tape 📼"
          style={{
            cursor: `url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='24' height='30' style='font-size:24px'><text y='50%' transform='rotate(-70 0 0) translate(-20, 6)'>🪄</text></svg>") 5 5, auto`,
          }}
          className="font-normal no-underline"
        >
          the Tooth Fairy
        </Link>
        . <span className="text-muted-foreground">(I&rsquo;ve improved a bit since then, I think?)</span>
      </p>

      <p>
        I&rsquo;m currently building{" "}
        <a
          href="https://domainstack.io"
          title="Domainstack: Domain intelligence made easy"
          className="font-medium"
          target="_blank"
          rel="noopener noreferrer"
        >
          Domainstack
        </a>
        , a beautiful all-in-one domain name intelligence tool, and{" "}
        <a
          href="https://snoozle.ai"
          title="Snoozle: AI-powered bedtime stories for children"
          className="font-medium"
          target="_blank"
          rel="noopener noreferrer"
        >
          Snoozle
        </a>
        , an AI-powered bedtime story generator.
      </p>

      <p className="mt-2 mb-0 text-sm leading-normal">
        You can find my work on{" "}
        <a href="https://github.com/jakejarvis" target="_blank" rel="noopener noreferrer me">
          GitHub
        </a>{" "}
        and{" "}
        <a href="https://www.linkedin.com/in/jakejarvis/" target="_blank" rel="noopener noreferrer me">
          LinkedIn
        </a>
        . I&rsquo;m always available to connect over{" "}
        <Link href="/contact" title="Send an email">
          email
        </Link>{" "}
        <sup className="">
          <a
            href="https://keyoxide.org/hkp/3bc6e5776bf379d36f6714802b0c9cf251e69a39"
            target="_blank"
            rel="noopener pgpkey"
            title="Download my PGP key"
            className="not-prose text-muted-foreground hover:text-primary space-x-1 px-0.5 text-nowrap no-underline hover:no-underline"
          >
            <LockIcon className="inline size-2.5" aria-hidden="true" />
            <code className="text-[9px] leading-none tracking-wider text-wrap [word-spacing:-3px]">
              2B0C 9CF2 51E6 9A39
            </code>
          </a>
        </sup>{" "}
        as well.
      </p>
    </div>
  );
};

export default Page;
