import Link from "next/link";
import isAbsoluteUrl from "is-absolute-url";
import hexRgb from "hex-rgb";
import { WaveIcon, LockIcon } from "../components/icons";
import type { ReactNode } from "react";

type ColorLinkProps = {
  children: ReactNode;
  href: string;
  lightColor: string;
  darkColor: string;
  title?: string;
  external?: boolean;
};
const ColorLink = ({ href, title, lightColor, darkColor, external = false, children }: ColorLinkProps) => {
  external = external || isAbsoluteUrl(href);

  // spits out a translucent color in rgba() format that's compatible with linear-gradient()
  const hexToRgba = (hex: string, alpha = 0.4) => hexRgb(hex, { alpha, format: "css" });

  return (
    <Link href={href} passHref={true} prefetch={false}>
      <a title={title} target={external ? "_blank" : undefined} rel={external ? "noopener noreferrer" : undefined}>
        {children}
        <style jsx>{`
          a {
            color: ${lightColor};
            background-image: linear-gradient(${hexToRgba(lightColor)}, ${hexToRgba(lightColor)});
          }
          :global([data-theme="dark"]) a {
            color: ${darkColor};
            background-image: linear-gradient(${hexToRgba(darkColor)}, ${hexToRgba(darkColor)});
          }
        `}</style>
      </a>
    </Link>
  );
};

const Index = () => (
  <>
    <h1>
      Hi there! I'm Jake.{" "}
      <span className="wave">
        <WaveIcon />
      </span>
    </h1>

    <h2>
      I'm a frontend web developer based in{" "}
      <ColorLink
        href="https://www.youtube-nocookie.com/embed/rLwbzGyC6t4?hl=en&amp;fs=1&amp;showinfo=1&amp;rel=0&amp;iv_load_policy=3"
        title='"Boston Accent Trailer - Late Night with Seth Meyers" on YouTube'
        lightColor="#fb4d42"
        darkColor="#ff5146"
      >
        Boston
      </ColorLink>
      .
    </h2>

    <p>
      I specialize in{" "}
      <ColorLink
        href="https://stackoverflow.blog/2018/01/11/brutal-lifecycle-javascript-frameworks/"
        title='"The Brutal Lifecycle of JavaScript Frameworks" by Ian Allen'
        lightColor="#1091b3"
        darkColor="#6fcbe3"
      >
        modern JS frameworks
      </ColorLink>{" "}
      and{" "}
      <ColorLink
        href="http://vanilla-js.com/"
        title="The best JS framework in the world by Eric Wastl"
        lightColor="#f48024"
        darkColor="#e18431"
      >
        vanilla JavaScript
      </ColorLink>{" "}
      to make nifty{" "}
      <ColorLink href="https://jamstack.wtf/" title="WTF is JAMstack?" lightColor="#04a699" darkColor="#08bbac">
        JAMstack sites
      </ColorLink>{" "}
      with dynamic{" "}
      <ColorLink
        href="https://nodejs.org/en/"
        title="Node.js Official Website"
        lightColor="#6fbc4e"
        darkColor="#84d95f"
      >
        Node.js
      </ColorLink>{" "}
      services. But I'm fluent in non-buzzwords like{" "}
      <ColorLink
        href="https://stitcher.io/blog/php-in-2020"
        title='"PHP in 2020" by Brent Roose'
        lightColor="#8892bf"
        darkColor="#a4afe3"
      >
        PHP
      </ColorLink>
      ,{" "}
      <ColorLink
        href="https://www.ruby-lang.org/en/"
        title="Ruby Official Website"
        lightColor="#d34135"
        darkColor="#f95a4d"
      >
        Ruby
      </ColorLink>
      , and{" "}
      <ColorLink href="https://golang.org/" title="Golang Official Website" lightColor="#00acd7" darkColor="#2ad1fb">
        Go
      </ColorLink>{" "}
      too.
    </p>

    <p>
      Whenever possible, I also apply my experience in{" "}
      <ColorLink
        href="https://github.com/jakejarvis/awesome-shodan-queries"
        title="jakejarvis/awesome-shodan-queries on GitHub"
        lightColor="#00b81a"
        darkColor="#57f06d"
      >
        application security
      </ColorLink>
      ,{" "}
      <ColorLink
        href="https://www.cloudflare.com/learning/serverless/what-is-serverless/"
        title='"What is serverless computing?" on Cloudflare'
        lightColor="#0098ec"
        darkColor="#43b9fb"
      >
        serverless stacks
      </ColorLink>
      , and{" "}
      <ColorLink href="https://xkcd.com/1319/" title='"Automation" on xkcd' lightColor="#ff6200" darkColor="#f46c16">
        DevOps automation
      </ColorLink>
      .
    </p>

    <p>
      I fell in love with{" "}
      <ColorLink
        href="/previously/"
        title="My Terrible, Horrible, No Good, Very Bad First Websites"
        lightColor="#4169e1"
        darkColor="#8ca9ff"
      >
        frontend web design
      </ColorLink>{" "}
      and{" "}
      <ColorLink
        href="/notes/my-first-code/"
        title="Jake's Bulletin Board, circa 2003"
        lightColor="#9932cc"
        darkColor="#d588fb"
      >
        backend programming
      </ColorLink>{" "}
      back when my only source of income was{" "}
      <span className="birthday">
        <ColorLink
          href="/birthday/"
          title="🎉 Cranky Birthday Boy on VHS Tape 📼"
          lightColor="#e40088"
          darkColor="#fd40b1"
        >
          the Tooth Fairy
        </ColorLink>
      </span>
      . <span className="quiet">I've improved a bit since then, I think...</span>
    </p>

    <p>
      Over the years, some of my side projects{" "}
      <ColorLink
        href="https://tuftsdaily.com/news/2012/04/06/student-designs-iphone-joeytracker-app/"
        title='"Student designs iPhone JoeyTracker app" on The Tufts Daily'
        lightColor="#ff1b1b"
        darkColor="#f06060"
      >
        have
      </ColorLink>{" "}
      <ColorLink
        href="/leo/"
        title="Powncer segment on The Lab with Leo Laporte (G4techTV)"
        lightColor="#f78200"
        darkColor="#fd992a"
      >
        been
      </ColorLink>{" "}
      <ColorLink
        href="https://www.google.com/books/edition/The_Facebook_Effect/RRUkLhyGZVgC?hl=en&gbpv=1&dq=%22jake%20jarvis%22&pg=PA226&printsec=frontcover&bsq=%22jake%20jarvis%22"
        title='"The Facebook Effect" by David Kirkpatrick (Google Books)'
        lightColor="#f2b702"
        darkColor="#ffcc2e"
      >
        featured
      </ColorLink>{" "}
      <ColorLink
        href="https://money.cnn.com/2007/06/01/technology/facebookplatform.fortune/index.htm"
        title='"The new Facebook is on a roll" on CNN Money'
        lightColor="#5ebd3e"
        darkColor="#78df55"
      >
        by
      </ColorLink>{" "}
      <ColorLink
        href="https://www.wired.com/2007/04/our-web-servers/"
        title='"Middio: A YouTube Scraper for Major Label Music Videos" on Wired'
        lightColor="#009cdf"
        darkColor="#29bfff"
      >
        various
      </ColorLink>{" "}
      <ColorLink
        href="https://gigaom.com/2009/10/06/fresh-faces-in-tech-10-kid-entrepreneurs-to-watch/6/"
        title='"Fresh Faces in Tech: 10 Kid Entrepreneurs to Watch" on Gigaom'
        lightColor="#3e49bb"
        darkColor="#7b87ff"
      >
        media
      </ColorLink>{" "}
      <ColorLink
        href="https://adage.com/article/small-agency-diary/client-ceo-s-son/116723/"
        title='"Your Next Client? The CEO&#39;s Son" on Advertising Age'
        lightColor="#973999"
        darkColor="#db60dd"
      >
        outlets
      </ColorLink>
      .
    </p>

    <p>
      You can find more of my work on{" "}
      <ColorLink
        href="https://github.com/jakejarvis"
        title="Jake Jarvis on GitHub"
        lightColor="#8d4eff"
        darkColor="#a379f0"
      >
        GitHub
      </ColorLink>{" "}
      and{" "}
      <ColorLink
        href="https://www.linkedin.com/in/jakejarvis/"
        title="Jake Jarvis on LinkedIn"
        lightColor="#0073b1"
        darkColor="#3b9dd2"
      >
        LinkedIn
      </ColorLink>
      . I'm always available to connect over{" "}
      <ColorLink href="/contact/" title="Send an email" lightColor="#de0c0c" darkColor="#ff5050">
        email
      </ColorLink>{" "}
      <sup className="monospace pgp_key">
        <ColorLink href="/pubkey.asc" title="My Public Key" lightColor="#757575" darkColor="#959595" external={true}>
          <LockIcon className="icon" /> 2B0C 9CF2 51E6 9A39
        </ColorLink>
      </sup>
      ,{" "}
      <ColorLink
        href="https://twitter.com/jakejarvis"
        title="Jake Jarvis on Twitter"
        lightColor="#00acee"
        darkColor="#3bc9ff"
      >
        Twitter
      </ColorLink>
      , or{" "}
      <ColorLink
        href="sms:+1-617-917-3737"
        title="Send SMS to +1 (617) 917-3737"
        lightColor="#6fcc01"
        darkColor="#8edb34"
      >
        SMS
      </ColorLink>{" "}
      as well!
    </p>

    <style jsx>{`
      h1 {
        margin: 0 0 0.5em -0.03em;
        font-size: 1.8em;
        font-weight: 500;
        letter-spacing: -0.01em;
      }
      h2 {
        margin: 0.5em 0 0.5em -0.03em;
        font-size: 1.35em;
        font-weight: 400;
        letter-spacing: -0.016em;
        line-height: 1.4;
      }
      p {
        margin: 0.85em 0;
        letter-spacing: -0.004em;
        line-height: 1.7;
      }
      p:last-of-type {
        margin-bottom: 0;
      }
      .wave {
        display: inline-block;
        margin-left: 0.1em;
        animation: wave 5s infinite;
        animation-delay: 1s;
        transform-origin: 65% 80%;
        will-change: transform;
      }
      .pgp_key {
        margin: 0 0.15em;
        font-size: 0.65em;
        word-spacing: -0.3em;
      }
      .pgp_key :global(a) {
        background: none !important;
        padding-bottom: 0;
      }
      .quiet {
        color: var(--medium-light);
      }
      .birthday :global(a:hover) {
        cursor: url("data:image/svg+xml;charset=utf-8,%3Csvg xmlns=%27http://www.w3.org/2000/svg%27 viewBox=%270 0 36 36%27 width=%2720%27 height=%2720%27%3E%3Cg fill=%27none%27%3E%3Cpath fill=%27%23292F33%27 d=%27m2.651 6.073 26.275 26.276c.391.391 2.888-2.107 2.497-2.497L5.148 3.576c-.39-.391-2.888 2.107-2.497 2.497z%27/%3E%3Cpath fill=%27%2366757F%27 d=%27M29.442 31.23 3.146 4.934l.883-.883 26.296 26.296z%27/%3E%3Cpath fill=%27%23E1E8ED%27 d=%27m33.546 33.483-.412.412-.671.671a.967.967 0 0 1-.255.169.988.988 0 0 1-1.159-.169l-2.102-2.102.495-.495.883-.883 1.119-1.119 2.102 2.102a.999.999 0 0 1 0 1.414zM4.029 4.79l-.883.883-.495.495L.442 3.96a.988.988 0 0 1-.169-1.159.967.967 0 0 1 .169-.255l.671-.671.412-.412a.999.999 0 0 1 1.414 0l2.208 2.208L4.029 4.79z%27/%3E%3Cpath fill=%27%23F5F8FA%27 d=%27m30.325 30.497 2.809 2.809-.671.671a.967.967 0 0 1-.255.169l-2.767-2.767.884-.882zM3.146 5.084.273 2.211a.967.967 0 0 1 .169-.255l.671-.671 2.916 2.916-.883.883z%27/%3E%3Cpath fill=%27%23FFAC33%27 d=%27m27.897 10.219 1.542.571.6 2.2a.667.667 0 0 0 1.287 0l.6-2.2 1.542-.571a.665.665 0 0 0 0-1.25l-1.534-.568-.605-2.415a.667.667 0 0 0-1.293 0l-.605 2.415-1.534.568a.665.665 0 0 0 0 1.25m-16.936 9.628 2.61.966.966 2.61a1.103 1.103 0 0 0 2.07 0l.966-2.61 2.609-.966a1.103 1.103 0 0 0 0-2.07l-2.609-.966-.966-2.61a1.105 1.105 0 0 0-2.07 0l-.966 2.61-2.61.966a1.104 1.104 0 0 0 0 2.07M23.13 4.36l1.383.512.512 1.382a.585.585 0 0 0 1.096 0l.512-1.382 1.382-.512a.584.584 0 0 0 0-1.096l-1.382-.512-.512-1.382a.585.585 0 0 0-1.096 0l-.512 1.382-1.383.512a.585.585 0 0 0 0 1.096%27/%3E%3C/g%3E%3C/svg%3E")
            0 0,
          auto;
      }

      @media screen and (max-width: 768px) {
        h1 {
          font-size: 1.5em;
        }
        h2 {
          font-size: 1.2em;
        }
        p {
          font-size: 0.95em;
        }
      }

      @keyframes wave {
        0% {
          transform: rotate(0deg);
        }
        5% {
          transform: rotate(14deg);
        }
        10% {
          transform: rotate(-8deg);
        }
        15% {
          transform: rotate(14deg);
        }
        20% {
          transform: rotate(-4deg);
        }
        25% {
          transform: rotate(10deg);
        }
        30% {
          transform: rotate(0deg);
        }

        // pause for 3.5 out of 5 seconds
        100% {
          transform: rotate(0deg);
        }
      }
    `}</style>
  </>
);

export default Index;
