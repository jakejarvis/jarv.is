import Link from "@/components/link";
import { LockIcon } from "lucide-react";

const Page = () => {
  return (
    <>
      <h1 className="mt-0 mb-2 text-3xl leading-relaxed font-medium">
        Hi there! I&rsquo;m Jake.{" "}
        <span className="motion-safe:animate-wave ml-0.5 inline-block origin-[65%_80%] text-3xl">👋</span>
      </h1>

      <h2 className="my-2 text-xl leading-relaxed font-normal">
        I&rsquo;m a frontend web developer based in the{" "}
        <Link
          href="https://www.youtube-nocookie.com/embed/rLwbzGyC6t4?hl=en&amp;fs=1&amp;showinfo=1&amp;rel=0&amp;iv_load_policy=3"
          title='"Boston Accent Trailer - Late Night with Seth Meyers" on YouTube'
          className="[--primary:#fb4d42] dark:[--primary:#ff5146]"
        >
          Boston
        </Link>{" "}
        area.
      </h2>

      <p className="my-3 text-base leading-relaxed md:text-[0.975rem]">
        I specialize in using{" "}
        <Link href="https://www.typescriptlang.org/" className="[--primary:#235a97] dark:[--primary:#59a8ff]">
          TypeScript
        </Link>
        ,{" "}
        <Link href="https://reactjs.org/" className="[--primary:#1091b3] dark:[--primary:#6fcbe3]">
          React
        </Link>
        , and{" "}
        <Link href="https://nextjs.org/" className="[--primary:#5e7693] dark:[--primary:#a8b9c0]">
          Next.js
        </Link>{" "}
        to make lightweight{" "}
        <Link href="https://jamstack.org/glossary/jamstack/" className="[--primary:#04a699] dark:[--primary:#08bbac]">
          Jamstack sites
        </Link>{" "}
        with dynamic and powerful{" "}
        <Link href="https://nodejs.org/en/" className="[--primary:#6fbc4e] dark:[--primary:#84d95f]">
          Node
        </Link>{" "}
        backends. But I still know my way around{" "}
        <Link
          href="https://www.jetbrains.com/lp/php-25/"
          title="25 Years of PHP History"
          className="[--primary:#8892bf] dark:[--primary:#a4afe3]"
        >
          less buzzwordy
        </Link>{" "}
        stacks (and{" "}
        <Link
          href="https://timkadlec.com/remembers/2020-04-21-the-cost-of-javascript-frameworks/"
          title='"The Cost of Javascript Frameworks" by Tim Kadlec'
          className="[--primary:#f48024] dark:[--primary:#e18431]"
        >
          vanilla JavaScript
        </Link>
        ), too.
      </p>

      <p className="my-3 text-base leading-relaxed md:text-[0.975rem]">
        Whenever possible, I also apply my experience in{" "}
        <Link
          href="https://bugcrowd.com/jakejarvis"
          title="Jake Jarvis on Bugcrowd"
          className="[--primary:#00b81a] dark:[--primary:#57f06d]"
        >
          information security
        </Link>
        ,{" "}
        <Link
          href="https://www.cloudflare.com/learning/serverless/what-is-serverless/"
          title='"What is serverless computing?" on Cloudflare'
          className="[--primary:#0098ec] dark:[--primary:#43b9fb]"
        >
          serverless architecture
        </Link>
        , and{" "}
        <Link
          href="https://github.com/jakejarvis?tab=repositories&q=github-actions&type=&language=&sort=stargazers"
          title='My repositories tagged with "github-actions" on GitHub'
          className="[--primary:#ff6200] dark:[--primary:#f46c16]"
        >
          automation
        </Link>
        .
      </p>

      <p className="my-3 text-base leading-relaxed md:text-[0.975rem]">
        I fell in love with{" "}
        <Link
          href="/previously"
          title="My Terrible, Horrible, No Good, Very Bad First Websites"
          className="[--primary:#4169e1] dark:[--primary:#8ca9ff]"
        >
          frontend web design
        </Link>{" "}
        and{" "}
        <Link
          href="/notes/my-first-code"
          title="Jake's Bulletin Board, circa 2003"
          className="[--primary:#9932cc] dark:[--primary:#d588fb]"
        >
          backend programming
        </Link>{" "}
        when my only source of income was{" "}
        <Link
          href="/birthday"
          title="🎉 Cranky Birthday Boy on VHS Tape 📼"
          className="[--primary:#e40088] dark:[--primary:#fd40b1]"
          style={{
            cursor: `url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='24' height='30' style='font-size:24px'><text y='50%' transform='rotate(-70 0 0) translate(-20, 6)'>🪄</text></svg>") 5 5, auto`,
          }}
        >
          the Tooth Fairy
        </Link>
        . <span className="text-muted-foreground">I&rsquo;ve improved a bit since then, I think? 🤷</span>
      </p>

      <p className="my-3 text-base leading-relaxed md:text-[0.975rem]">
        Over the years, some of my side projects{" "}
        <Link
          href="/leo"
          title="Powncer segment on The Lab with Leo Laporte (G4techTV)"
          className="[--primary:#ff1b1b] dark:[--primary:#f06060]"
        >
          have
        </Link>{" "}
        <Link
          href="https://tuftsdaily.com/news/2012/04/06/student-designs-iphone-joeytracker-app/"
          title='"Student designs iPhone JoeyTracker app" on The Tufts Daily'
          className="[--primary:#f78200] dark:[--primary:#fd992a]"
        >
          been
        </Link>{" "}
        <Link
          href="https://www.google.com/books/edition/The_Facebook_Effect/RRUkLhyGZVgC?hl=en&gbpv=1&dq=%22jake%20jarvis%22&pg=PA226&printsec=frontcover&bsq=%22jake%20jarvis%22"
          title='"The Facebook Effect" by David Kirkpatrick (Google Books)'
          className="[--primary:#f2b702] dark:[--primary:#ffcc2e]"
        >
          featured
        </Link>{" "}
        <Link
          href="https://money.cnn.com/2007/06/01/technology/facebookplatform.fortune/index.htm"
          title='"The new Facebook is on a roll" on CNN Money'
          className="[--primary:#5ebd3e] dark:[--primary:#78df55]"
        >
          by
        </Link>{" "}
        <Link
          href="https://www.wired.com/2007/04/our-web-servers/"
          title='"Middio: A YouTube Scraper for Major Label Music Videos" on Wired'
          className="[--primary:#009cdf] dark:[--primary:#29bfff]"
        >
          various
        </Link>{" "}
        <Link
          href="https://gigaom.com/2009/10/06/fresh-faces-in-tech-10-kid-entrepreneurs-to-watch/6/"
          title='"Fresh Faces in Tech: 10 Kid Entrepreneurs to Watch" on Gigaom'
          className="[--primary:#3e49bb] dark:[--primary:#7b87ff]"
        >
          media
        </Link>{" "}
        <Link
          href="https://adage.com/article/small-agency-diary/client-ceo-s-son/116723/"
          title='"Your Next Client? The CEO&#39;s Son" on Advertising Age'
          className="[--primary:#973999] dark:[--primary:#db60dd]"
        >
          outlets
        </Link>
        .
      </p>

      <p className="mt-3 mb-0 text-base leading-relaxed md:text-[0.975rem]">
        You can find my work on{" "}
        <Link href="https://github.com/jakejarvis" rel="me" className="[--primary:#8d4eff] dark:[--primary:#a379f0]">
          GitHub
        </Link>{" "}
        and{" "}
        <Link
          href="https://www.linkedin.com/in/jakejarvis/"
          rel="me"
          className="[--primary:#0073b1] dark:[--primary:#3b9dd2]"
        >
          LinkedIn
        </Link>
        . I&rsquo;m always available to connect over{" "}
        <Link href="/contact" title="Send an email" className="[--primary:#de0c0c] dark:[--primary:#ff5050]">
          email
        </Link>{" "}
        <sup className="mx-0.5 text-[0.6rem]">
          <Link
            href="https://jrvs.io/pgp"
            rel="pgpkey"
            title="My Public Key"
            className="text-muted-foreground hover:decoration-muted-foreground/40 text-nowrap hover:decoration-1 hover:underline-offset-4"
          >
            <LockIcon className="mr-0.5 inline size-3 align-text-top" />
            <code className="mx-0.5 tracking-wider text-wrap [word-spacing:-4px]">2B0C 9CF2 51E6 9A39</code>
          </Link>
        </sup>
        ,{" "}
        <Link href="https://bsky.app/profile/jarv.is" rel="me" className="[--primary:#0085ff] dark:[--primary:#208bfe]">
          Bluesky
        </Link>
        , or{" "}
        <Link href="https://fediverse.jarv.is/@jake" rel="me" className="[--primary:#6d6eff] dark:[--primary:#7b87ff]">
          Mastodon
        </Link>{" "}
        as well!
      </p>
    </>
  );
};

export default Page;
