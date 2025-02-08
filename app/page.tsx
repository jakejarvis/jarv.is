import { useId } from "react";
import { GoLock } from "react-icons/go";
import { rgba } from "polished";
import Link from "../components/Link";
import type { ComponentPropsWithoutRef } from "react";
import type { Route } from "next";

import styles from "./page.module.css";

const ColorfulLink = ({
  lightColor,
  darkColor,
  children,
  ...rest
}: ComponentPropsWithoutRef<typeof Link> & {
  lightColor: string;
  darkColor: string;
}) => {
  const uniqueId = `Link_themed__${useId().replace(/\W/g, "")}`;

  return (
    <>
      <Link id={uniqueId} {...rest}>
        {children}
      </Link>

      <style>{`.${styles.page} #${uniqueId}{color:${lightColor};--colors-linkUnderline:${rgba(lightColor, 0.4)}}[data-theme="dark"] .${styles.page} #${uniqueId}{color:${darkColor};--colors-linkUnderline:${rgba(darkColor, 0.4)}}`}</style>
    </>
  );
};

export default function Page() {
  return (
    <div className={styles.page}>
      <h1>
        Hi there! I'm Jake. <span className={styles.wave}>👋</span>
      </h1>

      <h2>
        I'm a frontend web developer based in the{" "}
        <ColorfulLink
          href="https://www.youtube-nocookie.com/embed/rLwbzGyC6t4?hl=en&amp;fs=1&amp;showinfo=1&amp;rel=0&amp;iv_load_policy=3"
          title='"Boston Accent Trailer - Late Night with Seth Meyers" on YouTube'
          lightColor="#fb4d42"
          darkColor="#ff5146"
        >
          Boston
        </ColorfulLink>{" "}
        area.
      </h2>

      <p>
        I specialize in{" "}
        <ColorfulLink
          href="https://reactjs.org/"
          title="React Official Website"
          lightColor="#1091b3"
          darkColor="#6fcbe3"
        >
          React
        </ColorfulLink>{" "}
        and{" "}
        <ColorfulLink
          href="https://timkadlec.com/remembers/2020-04-21-the-cost-of-javascript-frameworks/"
          title='"The Cost of Javascript Frameworks" by Tim Kadlec'
          lightColor="#f48024"
          darkColor="#e18431"
        >
          vanilla JavaScript
        </ColorfulLink>{" "}
        to make nifty{" "}
        <ColorfulLink href="https://jamstack.wtf/" title="WTF is Jamstack?" lightColor="#04a699" darkColor="#08bbac">
          Jamstack sites
        </ColorfulLink>{" "}
        with dynamic{" "}
        <ColorfulLink
          href="https://nodejs.org/en/"
          title="Node.js Official Website"
          lightColor="#6fbc4e"
          darkColor="#84d95f"
        >
          Node.js
        </ColorfulLink>{" "}
        services. But I still know my way around less buzzwordy stacks like{" "}
        <ColorfulLink
          href="https://www.jetbrains.com/lp/php-25/"
          title="25 Years of PHP History"
          lightColor="#8892bf"
          darkColor="#a4afe3"
        >
          LAMP
        </ColorfulLink>
        , too.
      </p>

      <p>
        Whenever possible, I also apply my experience in{" "}
        <ColorfulLink
          href="https://bugcrowd.com/jakejarvis"
          title="Jake Jarvis on Bugcrowd"
          lightColor="#00b81a"
          darkColor="#57f06d"
        >
          application security
        </ColorfulLink>
        ,{" "}
        <ColorfulLink
          href="https://www.cloudflare.com/learning/serverless/what-is-serverless/"
          title='"What is serverless computing?" on Cloudflare'
          lightColor="#0098ec"
          darkColor="#43b9fb"
        >
          serverless stacks
        </ColorfulLink>
        , and{" "}
        <ColorfulLink
          href="https://github.com/jakejarvis?tab=repositories&q=github-actions&type=source&language=&sort=stargazers"
          title='My repositories tagged with "github-actions" on GitHub'
          lightColor="#ff6200"
          darkColor="#f46c16"
        >
          DevOps automation
        </ColorfulLink>
        .
      </p>

      <p>
        I fell in love with{" "}
        <ColorfulLink
          href="/previously"
          title="My Terrible, Horrible, No Good, Very Bad First Websites"
          lightColor="#4169e1"
          darkColor="#8ca9ff"
        >
          frontend web design
        </ColorfulLink>{" "}
        and{" "}
        <ColorfulLink
          href={"/notes/my-first-code" as Route}
          title="Jake's Bulletin Board, circa 2003"
          lightColor="#9932cc"
          darkColor="#d588fb"
        >
          backend programming
        </ColorfulLink>{" "}
        when my only source of income was{" "}
        <ColorfulLink
          href="/birthday"
          title="🎉 Cranky Birthday Boy on VHS Tape 📼"
          lightColor="#e40088"
          darkColor="#fd40b1"
          style={{
            cursor: `url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='24' height='30' style='font-size:24px'><text y='50%' transform='rotate(-70 0 0) translate(-20, 6)'>🪄</text></svg>") 5 5, auto`,
          }}
        >
          the Tooth Fairy
        </ColorfulLink>
        . <span style={{ color: "var(--colors-mediumLight)" }}>I've improved a bit since then, I think? 🤷</span>
      </p>

      <p>
        Over the years, some of my side projects{" "}
        <ColorfulLink
          href="/leo"
          title="Powncer segment on The Lab with Leo Laporte (G4techTV)"
          lightColor="#ff1b1b"
          darkColor="#f06060"
        >
          have
        </ColorfulLink>{" "}
        <ColorfulLink
          href="https://tuftsdaily.com/news/2012/04/06/student-designs-iphone-joeytracker-app/"
          title='"Student designs iPhone JoeyTracker app" on The Tufts Daily'
          lightColor="#f78200"
          darkColor="#fd992a"
        >
          been
        </ColorfulLink>{" "}
        <ColorfulLink
          href="https://www.google.com/books/edition/The_Facebook_Effect/RRUkLhyGZVgC?hl=en&gbpv=1&dq=%22jake%20jarvis%22&pg=PA226&printsec=frontcover&bsq=%22jake%20jarvis%22"
          title='"The Facebook Effect" by David Kirkpatrick (Google Books)'
          lightColor="#f2b702"
          darkColor="#ffcc2e"
        >
          featured
        </ColorfulLink>{" "}
        <ColorfulLink
          href="https://money.cnn.com/2007/06/01/technology/facebookplatform.fortune/index.htm"
          title='"The new Facebook is on a roll" on CNN Money'
          lightColor="#5ebd3e"
          darkColor="#78df55"
        >
          by
        </ColorfulLink>{" "}
        <ColorfulLink
          href="https://www.wired.com/2007/04/our-web-servers/"
          title='"Middio: A YouTube Scraper for Major Label Music Videos" on Wired'
          lightColor="#009cdf"
          darkColor="#29bfff"
        >
          various
        </ColorfulLink>{" "}
        <ColorfulLink
          href="https://gigaom.com/2009/10/06/fresh-faces-in-tech-10-kid-entrepreneurs-to-watch/6/"
          title='"Fresh Faces in Tech: 10 Kid Entrepreneurs to Watch" on Gigaom'
          lightColor="#3e49bb"
          darkColor="#7b87ff"
        >
          media
        </ColorfulLink>{" "}
        <ColorfulLink
          href="https://adage.com/article/small-agency-diary/client-ceo-s-son/116723/"
          title='"Your Next Client? The CEO&#39;s Son" on Advertising Age'
          lightColor="#973999"
          darkColor="#db60dd"
        >
          outlets
        </ColorfulLink>
        .
      </p>

      <p>
        You can find my work on{" "}
        <ColorfulLink
          href="https://github.com/jakejarvis"
          rel="me"
          title="Jake Jarvis on GitHub"
          lightColor="#8d4eff"
          darkColor="#a379f0"
        >
          GitHub
        </ColorfulLink>{" "}
        and{" "}
        <ColorfulLink
          href="https://www.linkedin.com/in/jakejarvis/"
          rel="me"
          title="Jake Jarvis on LinkedIn"
          lightColor="#0073b1"
          darkColor="#3b9dd2"
        >
          LinkedIn
        </ColorfulLink>
        . I'm always available to connect over{" "}
        <ColorfulLink href="/contact" title="Send an email" lightColor="#de0c0c" darkColor="#ff5050">
          email
        </ColorfulLink>{" "}
        <sup>
          <ColorfulLink
            href={"/pubkey.asc" as Route}
            rel="pgpkey authn"
            title="My Public Key"
            lightColor="#757575"
            darkColor="#959595"
            underline={false}
            openInNewTab
          >
            <GoLock
              size="1.25em"
              style={{
                verticalAlign: "-0.25em",
                strokeWidth: 0.5,
              }}
            />{" "}
            <span
              style={{
                margin: "0 0.15em",
                fontFamily: "var(--fonts-mono)",
                letterSpacing: "0.075em",
                wordSpacing: "-0.4em",
              }}
            >
              2B0C 9CF2 51E6 9A39
            </span>
          </ColorfulLink>
        </sup>
        ,{" "}
        <ColorfulLink
          href="https://bsky.app/profile/jarv.is"
          rel="me"
          title="Jake Jarvis on Bluesky"
          lightColor="#0085FF"
          darkColor="#208BFE"
        >
          Bluesky
        </ColorfulLink>
        ,{" "}
        <ColorfulLink
          href="https://fediverse.jarv.is/@jake"
          rel="me"
          title="Jake Jarvis on Mastodon"
          lightColor="#6d6eff"
          darkColor="#7b87ff"
        >
          Mastodon
        </ColorfulLink>
        , or{" "}
        <ColorfulLink
          href="sms:+1-617-917-3737"
          title="Send SMS to +1 (617) 917-3737"
          lightColor="#6fcc01"
          darkColor="#8edb34"
        >
          SMS
        </ColorfulLink>{" "}
        as well!
      </p>
    </div>
  );
}
