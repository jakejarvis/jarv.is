import { LockIcon } from "lucide-react";
import Link from "next/link";

const Page = () => (
  <div className="prose">
    <h1 className="text-2xl font-medium">
      Hi there! I&rsquo;m Jake.{" "}
      <span className="motion-safe:animate-wave ml-0.5 inline-block origin-[65%_80%] text-2xl">
        👋
      </span>
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

    <p className="mt-2 mb-0 text-sm leading-normal">
      I&rsquo;m always available to connect over{" "}
      <a href="mailto:jake@jarv.is" title="Send an email">
        email
      </a>{" "}
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
      </sup>
      .
    </p>
  </div>
);

export default Page;
