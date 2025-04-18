import clsx from "clsx";
import hash from "@emotion/hash";
import { rgba } from "polished";
import { LockIcon } from "lucide-react";
import UnstyledLink from "../components/Link";
import type { ComponentPropsWithoutRef } from "react";

import styles from "./page.module.css";

const Link = ({
  lightColor,
  darkColor,
  className,
  children,
  ...rest
}: ComponentPropsWithoutRef<typeof UnstyledLink> & {
  lightColor?: string;
  darkColor?: string;
}) => {
  if (lightColor && darkColor) {
    const uniqueId = hash(`${lightColor},${darkColor}`);

    return (
      <UnstyledLink className={clsx(`t_${uniqueId}`, className)} {...rest}>
        {children}

        <style
          // workaround to have react combine all of these inline styles into a single <style> tag up top, see:
          // https://react.dev/reference/react-dom/components/style#rendering-an-inline-css-stylesheet
          href={uniqueId}
          precedence={styles.index}
        >
          {`.t_${uniqueId}{--colors-link:${lightColor};--colors-link-underline:${rgba(lightColor, 0.4)}}[data-theme="dark"] .t_${uniqueId}{--colors-link:${darkColor};--colors-link-underline:${rgba(darkColor, 0.4)}}`}
        </style>
      </UnstyledLink>
    );
  }

  return (
    <UnstyledLink className={className} {...rest}>
      {children}
    </UnstyledLink>
  );
};

const Page = () => {
  return (
    <div className={styles.index}>
      <h1>
        Hi there! I&rsquo;m Jake. <span className={styles.wave}>👋</span>
      </h1>

      <h2>
        I&rsquo;m a frontend web developer based in the{" "}
        <Link
          href="https://www.youtube-nocookie.com/embed/rLwbzGyC6t4?hl=en&amp;fs=1&amp;showinfo=1&amp;rel=0&amp;iv_load_policy=3"
          title='"Boston Accent Trailer - Late Night with Seth Meyers" on YouTube'
          lightColor="#fb4d42"
          darkColor="#ff5146"
        >
          Boston
        </Link>{" "}
        area.
      </h2>

      <p>
        I specialize in using{" "}
        <Link
          href="https://www.typescriptlang.org/"
          title="TypeScript Official Website"
          lightColor="#235a97"
          darkColor="#59a8ff"
        >
          TypeScript
        </Link>
        ,{" "}
        <Link href="https://reactjs.org/" title="React Official Website" lightColor="#1091b3" darkColor="#6fcbe3">
          React
        </Link>
        , and{" "}
        <Link href="https://nextjs.org/" title="Next.js Official Website" lightColor="#5e7693" darkColor="#a8b9c0">
          Next.js
        </Link>{" "}
        to make lightweight{" "}
        <Link
          href="https://jamstack.org/glossary/jamstack/"
          title="Jamstack Glossary"
          lightColor="#04a699"
          darkColor="#08bbac"
        >
          Jamstack sites
        </Link>{" "}
        with dynamic and powerful{" "}
        <Link href="https://nodejs.org/en/" title="Node.js Official Website" lightColor="#6fbc4e" darkColor="#84d95f">
          Node
        </Link>{" "}
        backends. But I still know my way around{" "}
        <Link
          href="https://www.jetbrains.com/lp/php-25/"
          title="25 Years of PHP History"
          lightColor="#8892bf"
          darkColor="#a4afe3"
        >
          less buzzwordy
        </Link>{" "}
        stacks (and{" "}
        <Link
          href="https://timkadlec.com/remembers/2020-04-21-the-cost-of-javascript-frameworks/"
          title='"The Cost of Javascript Frameworks" by Tim Kadlec'
          lightColor="#f48024"
          darkColor="#e18431"
        >
          vanilla JavaScript
        </Link>
        ), too.
      </p>

      <p>
        Whenever possible, I also apply my experience in{" "}
        <Link
          href="https://bugcrowd.com/jakejarvis"
          title="Jake Jarvis on Bugcrowd"
          lightColor="#00b81a"
          darkColor="#57f06d"
        >
          application security
        </Link>
        ,{" "}
        <Link
          href="https://www.cloudflare.com/learning/serverless/what-is-serverless/"
          title='"What is serverless computing?" on Cloudflare'
          lightColor="#0098ec"
          darkColor="#43b9fb"
        >
          serverless stacks
        </Link>
        , and{" "}
        <Link
          href="https://github.com/jakejarvis?tab=repositories&q=github-actions&type=source&language=&sort=stargazers"
          title='My repositories tagged with "github-actions" on GitHub'
          lightColor="#ff6200"
          darkColor="#f46c16"
        >
          DevOps automation
        </Link>
        .
      </p>

      <p>
        I fell in love with{" "}
        <Link
          href="/previously"
          title="My Terrible, Horrible, No Good, Very Bad First Websites"
          lightColor="#4169e1"
          darkColor="#8ca9ff"
        >
          frontend web design
        </Link>{" "}
        and{" "}
        <Link
          href="/notes/my-first-code"
          title="Jake's Bulletin Board, circa 2003"
          lightColor="#9932cc"
          darkColor="#d588fb"
        >
          backend programming
        </Link>{" "}
        when my only source of income was{" "}
        <Link
          href="/birthday"
          title="🎉 Cranky Birthday Boy on VHS Tape 📼"
          lightColor="#e40088"
          darkColor="#fd40b1"
          style={{
            cursor: `url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='24' height='30' style='font-size:24px'><text y='50%' transform='rotate(-70 0 0) translate(-20, 6)'>🪄</text></svg>") 5 5, auto`,
          }}
        >
          the Tooth Fairy
        </Link>
        . <span style={{ color: "var(--colors-medium-light)" }}>I&rsquo;ve improved a bit since then, I think? 🤷</span>
      </p>

      <p>
        Over the years, some of my side projects{" "}
        <Link
          href="/leo"
          title="Powncer segment on The Lab with Leo Laporte (G4techTV)"
          lightColor="#ff1b1b"
          darkColor="#f06060"
        >
          have
        </Link>{" "}
        <Link
          href="https://tuftsdaily.com/news/2012/04/06/student-designs-iphone-joeytracker-app/"
          title='"Student designs iPhone JoeyTracker app" on The Tufts Daily'
          lightColor="#f78200"
          darkColor="#fd992a"
        >
          been
        </Link>{" "}
        <Link
          href="https://www.google.com/books/edition/The_Facebook_Effect/RRUkLhyGZVgC?hl=en&gbpv=1&dq=%22jake%20jarvis%22&pg=PA226&printsec=frontcover&bsq=%22jake%20jarvis%22"
          title='"The Facebook Effect" by David Kirkpatrick (Google Books)'
          lightColor="#f2b702"
          darkColor="#ffcc2e"
        >
          featured
        </Link>{" "}
        <Link
          href="https://money.cnn.com/2007/06/01/technology/facebookplatform.fortune/index.htm"
          title='"The new Facebook is on a roll" on CNN Money'
          lightColor="#5ebd3e"
          darkColor="#78df55"
        >
          by
        </Link>{" "}
        <Link
          href="https://www.wired.com/2007/04/our-web-servers/"
          title='"Middio: A YouTube Scraper for Major Label Music Videos" on Wired'
          lightColor="#009cdf"
          darkColor="#29bfff"
        >
          various
        </Link>{" "}
        <Link
          href="https://gigaom.com/2009/10/06/fresh-faces-in-tech-10-kid-entrepreneurs-to-watch/6/"
          title='"Fresh Faces in Tech: 10 Kid Entrepreneurs to Watch" on Gigaom'
          lightColor="#3e49bb"
          darkColor="#7b87ff"
        >
          media
        </Link>{" "}
        <Link
          href="https://adage.com/article/small-agency-diary/client-ceo-s-son/116723/"
          title='"Your Next Client? The CEO&#39;s Son" on Advertising Age'
          lightColor="#973999"
          darkColor="#db60dd"
        >
          outlets
        </Link>
        .
      </p>

      <p>
        You can find my work on{" "}
        <Link
          href="https://github.com/jakejarvis"
          rel="me"
          title="Jake Jarvis on GitHub"
          lightColor="#8d4eff"
          darkColor="#a379f0"
        >
          GitHub
        </Link>{" "}
        and{" "}
        <Link
          href="https://www.linkedin.com/in/jakejarvis/"
          rel="me"
          title="Jake Jarvis on LinkedIn"
          lightColor="#0073b1"
          darkColor="#3b9dd2"
        >
          LinkedIn
        </Link>
        . I&rsquo;m always available to connect over{" "}
        <Link href="/contact" title="Send an email" lightColor="#de0c0c" darkColor="#ff5050">
          email
        </Link>{" "}
        <sup>
          <Link
            href="https://jrvs.io/pgp"
            rel="pgpkey"
            title="My Public Key"
            lightColor="#757575"
            darkColor="#959595"
            plain
          >
            <LockIcon size="1.25em" style={{ verticalAlign: "text-top" }} />{" "}
            <code
              style={{
                margin: "0 0.15em",
                letterSpacing: "0.075em",
                wordSpacing: "-0.4em",
              }}
            >
              2B0C 9CF2 51E6 9A39
            </code>
          </Link>
        </sup>
        ,{" "}
        <Link
          href="https://bsky.app/profile/jarv.is"
          rel="me"
          title="Jake Jarvis on Bluesky"
          lightColor="#0085ff"
          darkColor="#208bfe"
        >
          Bluesky
        </Link>
        , or{" "}
        <Link
          href="https://fediverse.jarv.is/@jake"
          rel="me"
          title="Jake Jarvis on Mastodon"
          lightColor="#6d6eff"
          darkColor="#7b87ff"
        >
          Mastodon
        </Link>{" "}
        as well!
      </p>
    </div>
  );
};

export default Page;
