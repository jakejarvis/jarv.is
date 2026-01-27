import Link from "@/components/link";
import { LockIcon } from "lucide-react";

const Page = () => {
  return (
    <div className="prose prose-sm prose-neutral dark:prose-invert prose-headings:mt-0 prose-headings:mb-3 prose-p:my-3 max-w-none">
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
        <Link href="https://bugcrowd.com/jakejarvis" title="Jake Jarvis on Bugcrowd">
          information security
        </Link>{" "}
        and{" "}
        <Link
          href="https://github.com/jakejarvis?tab=repositories&q=github-actions&type=&language=&sort=stargazers"
          title='My repositories tagged with "github-actions" on GitHub'
        >
          devops
        </Link>
        .
      </p>

      <p>
        I fell in love with{" "}
        <Link href="/previously" prefetch={false} title="My Terrible, Horrible, No Good, Very Bad First Websites">
          frontend web design
        </Link>{" "}
        and{" "}
        <Link href="/notes/my-first-code" prefetch={false} title="Jake's Bulletin Board, circa 2003">
          backend coding
        </Link>{" "}
        when my only source of income was{" "}
        <Link
          href="/birthday"
          prefetch={false}
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
        <Link href="https://domainstack.io" title="Domainstack: Domain intelligence made easy" className="font-medium">
          Domainstack
        </Link>
        , a beautiful all-in-one domain name intelligence tool, and{" "}
        <Link
          href="https://snoozle.ai"
          title="Snoozle: AI-powered bedtime stories for children"
          className="font-medium"
        >
          Snoozle
        </Link>
        , an AI-powered bedtime story generator.
      </p>

      <p className="mt-2 mb-0 text-sm leading-normal">
        You can find my work on{" "}
        <Link href="https://github.com/jakejarvis" rel="me">
          GitHub
        </Link>{" "}
        and{" "}
        <Link href="https://www.linkedin.com/in/jakejarvis/" rel="me">
          LinkedIn
        </Link>
        . I&rsquo;m always available to connect over{" "}
        <Link href="/contact" prefetch={false} title="Send an email">
          email
        </Link>{" "}
        <sup className="text-[10px]">
          <Link
            href="https://jrvs.io/pgp"
            rel="pgpkey"
            title="3BC6 E577 6BF3 79D3 6F67 1480 2B0C 9CF2 51E6 9A39"
            className="not-prose text-muted-foreground hover:text-primary space-x-1 px-0.5 text-nowrap no-underline hover:no-underline"
          >
            <LockIcon className="inline size-2.5" aria-hidden="true" />
            <code className="leading-none tracking-wider text-wrap [word-spacing:-3px]">2B0C 9CF2 51E6 9A39</code>
          </Link>
        </sup>{" "}
        as well.
      </p>
    </div>
  );
};

export default Page;
