import Link from "./ColorLink";
import { WaveIcon, LockIcon } from "../icons";

import styles from "./Home.module.scss";

export default function Home() {
  return (
    <div className={styles.home}>
      <h1>
        Hi there! I'm Jake.{" "}
        <span className={styles.wave}>
          <WaveIcon />
        </span>
      </h1>

      <h2>
        I'm a frontend web developer based in{" "}
        <Link
          href="https://www.youtube-nocookie.com/embed/rLwbzGyC6t4?hl=en&amp;fs=1&amp;showinfo=1&amp;rel=0&amp;iv_load_policy=3"
          title='"Boston Accent Trailer - Late Night with Seth Meyers" on YouTube'
          lightColor="#fb4d42"
          darkColor="#ff5146"
        >
          Boston
        </Link>
        .
      </h2>

      <p>
        I specialize in{" "}
        <Link
          href="https://stackoverflow.blog/2018/01/11/brutal-lifecycle-javascript-frameworks/"
          title='"The Brutal Lifecycle of JavaScript Frameworks" by Ian Allen'
          lightColor="#1091b3"
          darkColor="#6fcbe3"
        >
          modern JS frameworks
        </Link>{" "}
        and{" "}
        <Link
          href="http://vanilla-js.com/"
          title="The best JS framework in the world by Eric Wastl"
          lightColor="#f48024"
          darkColor="#e18431"
        >
          vanilla JavaScript
        </Link>{" "}
        to make nifty{" "}
        <Link href="https://jamstack.wtf/" title="WTF is JAMstack?" lightColor="#04a699" darkColor="#08bbac">
          JAMstack sites
        </Link>{" "}
        with dynamic{" "}
        <Link href="https://nodejs.org/en/" title="Node.js Official Website" lightColor="#6fbc4e" darkColor="#84d95f">
          Node.js
        </Link>{" "}
        services. But I'm fluent in classics like{" "}
        <Link
          href="https://stitcher.io/blog/php-in-2020"
          title='"PHP in 2020" by Brent Roose'
          lightColor="#8892bf"
          darkColor="#a4afe3"
        >
          PHP
        </Link>
        ,{" "}
        <Link
          href="https://www.ruby-lang.org/en/"
          title="Ruby Official Website"
          lightColor="#d34135"
          darkColor="#f95a4d"
        >
          Ruby
        </Link>
        , and{" "}
        <Link href="https://golang.org/" title="Golang Official Website" lightColor="#00acd7" darkColor="#2ad1fb">
          Go
        </Link>{" "}
        too.
      </p>

      <p>
        Whenever possible, I also apply my experience in{" "}
        <Link
          href="https://github.com/jakejarvis/awesome-shodan-queries"
          title="jakejarvis/awesome-shodan-queries on GitHub"
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
        <Link href="https://xkcd.com/1319/" title='"Automation" on xkcd' lightColor="#ff6200" darkColor="#f46c16">
          DevOps automation
        </Link>
        .
      </p>

      <p>
        I fell in love with{" "}
        <Link
          href="/previously/"
          title="My Terrible, Horrible, No Good, Very Bad First Websites"
          lightColor="#4169e1"
          darkColor="#8ca9ff"
        >
          frontend web design
        </Link>{" "}
        and{" "}
        <Link
          href="/notes/my-first-code/"
          title="Jake's Bulletin Board, circa 2003"
          lightColor="#9932cc"
          darkColor="#d588fb"
        >
          backend programming
        </Link>{" "}
        back when my only source of income was{" "}
        <Link
          className={styles.birthday}
          href="/birthday/"
          title="🎉 Cranky Birthday Boy on VHS Tape 📼"
          lightColor="#e40088"
          darkColor="#fd40b1"
        >
          the Tooth Fairy
        </Link>
        . <span className={styles.light}>I've improved a bit since then, I think...</span>
      </p>

      <p>
        Over the years, some of my side projects{" "}
        <Link
          href="https://tuftsdaily.com/news/2012/04/06/student-designs-iphone-joeytracker-app/"
          title='"Student designs iPhone JoeyTracker app" on The Tufts Daily'
          lightColor="#ff1b1b"
          darkColor="#f06060"
        >
          have
        </Link>{" "}
        <Link
          href="/leo/"
          title="Powncer segment on The Lab with Leo Laporte (G4techTV)"
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
        You can find more of my work on{" "}
        <Link
          href="https://github.com/jakejarvis"
          title="Jake Jarvis on GitHub"
          lightColor="#8d4eff"
          darkColor="#a379f0"
        >
          GitHub
        </Link>{" "}
        and{" "}
        <Link
          href="https://www.linkedin.com/in/jakejarvis/"
          title="Jake Jarvis on LinkedIn"
          lightColor="#0073b1"
          darkColor="#3b9dd2"
        >
          LinkedIn
        </Link>
        . I'm always available to connect over{" "}
        <Link href="/contact/" title="Send an email" lightColor="#de0c0c" darkColor="#ff5050">
          email
        </Link>{" "}
        <sup className="monospace">
          <Link href="/pubkey.asc" title="My Public Key" lightColor="#757575" darkColor="#959595" external={true}>
            <span className={styles.pgp}>
              <LockIcon alt="PGP Key" /> 2B0C 9CF2 51E6 9A39
            </span>
          </Link>
        </sup>
        ,{" "}
        <Link
          href="https://twitter.com/jakejarvis"
          title="Jake Jarvis on Twitter"
          lightColor="#00acee"
          darkColor="#3bc9ff"
        >
          Twitter
        </Link>
        , or{" "}
        <Link href="sms:+1-617-917-3737" title="Send SMS to +1 (617) 917-3737" lightColor="#6fcc01" darkColor="#8edb34">
          SMS
        </Link>{" "}
        as well!
      </p>
    </div>
  );
}
