import Content from "../components/Content/Content";
import ColorfulLink from "../components/ColorfulLink/ColorfulLink";
import { WaveIcon, LockIcon } from "../components/Icons";

const Index = () => (
  <>
    <Content>
      <div className="home">
        <h1>
          Hi there! I'm Jake.{" "}
          <span className="wave">
            <WaveIcon />
          </span>
        </h1>

        <h2>
          I'm a frontend web developer based in{" "}
          <ColorfulLink
            href="https://www.youtube-nocookie.com/embed/rLwbzGyC6t4?hl=en&amp;fs=1&amp;showinfo=1&amp;rel=0&amp;iv_load_policy=3"
            title='"Boston Accent Trailer - Late Night with Seth Meyers" on YouTube'
            lightColor="#fb4d42"
            darkColor="#ff5146"
            external
          >
            Boston
          </ColorfulLink>
          .
        </h2>

        <p>
          I specialize in{" "}
          <ColorfulLink
            href="https://stackoverflow.blog/2018/01/11/brutal-lifecycle-javascript-frameworks/"
            title='"The Brutal Lifecycle of JavaScript Frameworks" by Ian Allen'
            lightColor="#1091b3"
            darkColor="#6fcbe3"
            external
          >
            modern JS frameworks
          </ColorfulLink>{" "}
          and{" "}
          <ColorfulLink
            href="http://vanilla-js.com/"
            title="The best JS framework in the world by Eric Wastl"
            lightColor="#f48024"
            darkColor="#e18431"
            external
          >
            vanilla JavaScript
          </ColorfulLink>{" "}
          to make nifty{" "}
          <ColorfulLink
            href="https://jamstack.wtf/"
            title="WTF is JAMstack?"
            lightColor="#04a699"
            darkColor="#08bbac"
            external
          >
            JAMstack sites
          </ColorfulLink>{" "}
          with dynamic{" "}
          <ColorfulLink
            href="https://nodejs.org/en/"
            title="Node.js Official Website"
            lightColor="#6fbc4e"
            darkColor="#84d95f"
            external
          >
            Node.js
          </ColorfulLink>{" "}
          services. But I'm fluent in non-buzzwords like{" "}
          <ColorfulLink
            href="https://stitcher.io/blog/php-in-2020"
            title='"PHP in 2020" by Brent Roose'
            lightColor="#8892bf"
            darkColor="#a4afe3"
            external
          >
            PHP
          </ColorfulLink>
          ,{" "}
          <ColorfulLink
            href="https://www.ruby-lang.org/en/"
            title="Ruby Official Website"
            lightColor="#d34135"
            darkColor="#f95a4d"
            external
          >
            Ruby
          </ColorfulLink>
          , and{" "}
          <ColorfulLink
            href="https://golang.org/"
            title="Golang Official Website"
            lightColor="#00acd7"
            darkColor="#2ad1fb"
            external
          >
            Go
          </ColorfulLink>{" "}
          too.
        </p>

        <p>
          Whenever possible, I also apply my experience in{" "}
          <ColorfulLink
            href="https://github.com/jakejarvis/awesome-shodan-queries"
            title="jakejarvis/awesome-shodan-queries on GitHub"
            lightColor="#00b81a"
            darkColor="#57f06d"
            external
          >
            application security
          </ColorfulLink>
          ,{" "}
          <ColorfulLink
            href="https://www.cloudflare.com/learning/serverless/what-is-serverless/"
            title='"What is serverless computing?" on Cloudflare'
            lightColor="#0098ec"
            darkColor="#43b9fb"
            external
          >
            serverless stacks
          </ColorfulLink>
          , and{" "}
          <ColorfulLink
            href="https://xkcd.com/1319/"
            title='"Automation" on xkcd'
            lightColor="#ff6200"
            darkColor="#f46c16"
            external
          >
            DevOps automation
          </ColorfulLink>
          .
        </p>

        <p>
          I fell in love with{" "}
          <ColorfulLink
            href="/previously/"
            title="My Terrible, Horrible, No Good, Very Bad First Websites"
            lightColor="#4169e1"
            darkColor="#8ca9ff"
          >
            frontend web design
          </ColorfulLink>{" "}
          and{" "}
          <ColorfulLink
            href="/notes/my-first-code/"
            title="Jake's Bulletin Board, circa 2003"
            lightColor="#9932cc"
            darkColor="#d588fb"
          >
            backend programming
          </ColorfulLink>{" "}
          back when my only source of income was{" "}
          <span className="birthday">
            <ColorfulLink
              href="/birthday/"
              title="🎉 Cranky Birthday Boy on VHS Tape 📼"
              lightColor="#e40088"
              darkColor="#fd40b1"
            >
              the Tooth Fairy
            </ColorfulLink>
          </span>
          . <span className="quiet">I've improved a bit since then, I think...</span>
        </p>

        <p>
          Over the years, some of my side projects{" "}
          <ColorfulLink
            href="https://tuftsdaily.com/news/2012/04/06/student-designs-iphone-joeytracker-app/"
            title='"Student designs iPhone JoeyTracker app" on The Tufts Daily'
            lightColor="#ff1b1b"
            darkColor="#f06060"
            external
          >
            have
          </ColorfulLink>{" "}
          <ColorfulLink
            href="/leo/"
            title="Powncer segment on The Lab with Leo Laporte (G4techTV)"
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
            external
          >
            featured
          </ColorfulLink>{" "}
          <ColorfulLink
            href="https://money.cnn.com/2007/06/01/technology/facebookplatform.fortune/index.htm"
            title='"The new Facebook is on a roll" on CNN Money'
            lightColor="#5ebd3e"
            darkColor="#78df55"
            external
          >
            by
          </ColorfulLink>{" "}
          <ColorfulLink
            href="https://www.wired.com/2007/04/our-web-servers/"
            title='"Middio: A YouTube Scraper for Major Label Music Videos" on Wired'
            lightColor="#009cdf"
            darkColor="#29bfff"
            external
          >
            various
          </ColorfulLink>{" "}
          <ColorfulLink
            href="https://gigaom.com/2009/10/06/fresh-faces-in-tech-10-kid-entrepreneurs-to-watch/6/"
            title='"Fresh Faces in Tech: 10 Kid Entrepreneurs to Watch" on Gigaom'
            lightColor="#3e49bb"
            darkColor="#7b87ff"
            external
          >
            media
          </ColorfulLink>{" "}
          <ColorfulLink
            href="https://adage.com/article/small-agency-diary/client-ceo-s-son/116723/"
            title='"Your Next Client? The CEO&#39;s Son" on Advertising Age'
            lightColor="#973999"
            darkColor="#db60dd"
            external
          >
            outlets
          </ColorfulLink>
          .
        </p>

        <p>
          You can find more of my work on{" "}
          <ColorfulLink
            href="https://github.com/jakejarvis"
            title="Jake Jarvis on GitHub"
            lightColor="#8d4eff"
            darkColor="#a379f0"
            external
          >
            GitHub
          </ColorfulLink>{" "}
          and{" "}
          <ColorfulLink
            href="https://www.linkedin.com/in/jakejarvis/"
            title="Jake Jarvis on LinkedIn"
            lightColor="#0073b1"
            darkColor="#3b9dd2"
            external
          >
            LinkedIn
          </ColorfulLink>
          . I'm always available to connect over{" "}
          <ColorfulLink href="/contact/" title="Send an email" lightColor="#de0c0c" darkColor="#ff5050">
            email
          </ColorfulLink>{" "}
          <sup className="monospace pgp_key">
            <ColorfulLink
              className="no-underline"
              href="/pubkey.asc"
              title="My Public Key"
              lightColor="#757575"
              darkColor="#959595"
              external
            >
              <LockIcon /> 2B0C 9CF2 51E6 9A39
            </ColorfulLink>
          </sup>
          ,{" "}
          <ColorfulLink
            href="https://twitter.com/jakejarvis"
            title="Jake Jarvis on Twitter"
            lightColor="#00acee"
            darkColor="#3bc9ff"
            external
          >
            Twitter
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
    </Content>

    <style jsx>{`
      .home {
        font-size: 1.1em;
        line-height: 1;
      }
      .home h1 {
        margin: 0 0 0.5em -0.03em;
        font-size: 1.8em;
        font-weight: 500;
        letter-spacing: -0.01em;
      }
      .home h2 {
        margin: 0.5em 0 0.5em -0.03em;
        font-size: 1.35em;
        font-weight: 400;
        letter-spacing: -0.016em;
        line-height: 1.4;
      }
      .home p {
        margin: 0.85em 0;
        letter-spacing: -0.004em;
        line-height: 1.7;
      }
      .home p:last-of-type {
        margin-bottom: 0;
      }
      .home .wave {
        display: inline-block;
        margin-left: 0.1em;
        animation: wave 5s infinite;
        animation-delay: 1s;
        transform-origin: 65% 80%;
        will-change: transform;
      }
      .home .pgp_key {
        margin: 0 0.15em;
        font-size: 0.65em;
        word-spacing: -0.3em;
      }
      .home .pgp_key :global(a) {
        background: none !important;
      }
      .home .quiet {
        color: var(--medium-light);
      }
      .home .birthday :global(a:hover) {
        /* magic wand cursor easter egg */
        cursor: url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='24' height='30' style='font-size:24px'><text y='50%' transform='rotate(-70 0 0) translate(-20, 6)'>🪄</text></svg>")
            5 5,
          auto;
      }

      @media screen and (max-width: 768px) {
        .home h1 {
          font-size: 1.5em;
        }
        .home h2 {
          font-size: 1.2em;
        }
        .home p {
          font-size: 0.925em;
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
