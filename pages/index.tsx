import Link, { LinkProps } from "../components/Link";
import { styled, theme, darkTheme, keyframes } from "../lib/styles/stitches.config";

const ColorfulLink = ({
  lightColor,
  darkColor,
  css,
  ...rest
}: LinkProps & {
  lightColor: string;
  darkColor: string;
}) => {
  return (
    <Link
      css={{
        color: lightColor,
        setUnderlineVars: { color: lightColor },

        [`.${darkTheme} &`]: {
          color: darkColor,
          setUnderlineVars: { color: darkColor },
        },

        ...css,
      }}
      {...rest}
    />
  );
};

const H1 = styled("h1", {
  margin: "0 0 0.5em -1px", // misaligned left margin, super nitpicky
  fontSize: "1.8em",
  fontWeight: 500,
  lineHeight: 1.1,
  color: theme.colors.text,

  "@medium": {
    fontSize: "1.6em",
  },
});

const H2 = styled("h2", {
  margin: "0.5em 0 0.5em -1px", // misaligned left margin, super nitpicky
  fontSize: "1.35em",
  fontWeight: 400,
  lineHeight: 1.4,
  color: theme.colors.text,

  "@medium": {
    fontSize: "1.25em",
  },
});

const Paragraph = styled("p", {
  margin: "0.85em 0",
  lineHeight: 1.7,
  color: theme.colors.text,

  "&:last-of-type": {
    marginBottom: 0,
  },

  "@medium": {
    fontSize: "0.95em",
    lineHeight: 1.825,
  },
});

const Wave = styled("span", {
  display: "inline-block",
  marginLeft: "0.1em",
  fontSize: "1.2em",

  "@media (prefers-reduced-motion: no-preference)": {
    animation: `${keyframes({
      "0%": { transform: "rotate(0deg)" },
      "5%": { transform: "rotate(14deg)" },
      "10%": { transform: "rotate(-8deg)" },
      "15%": { transform: "rotate(14deg)" },
      "20%": { transform: "rotate(-4deg)" },
      "25%": { transform: "rotate(10deg)" },
      "30%": { transform: "rotate(0deg)" },
      // pause for ~9 out of 10 seconds
      "100%": { transform: "rotate(0deg)" },
    })} 5s ease 1s infinite`,
    transformOrigin: "65% 80%",
    willChange: "transform",
  },
});

const Sup = styled("sup", {
  margin: "0 0.15em",
  fontSize: "0.65em",
});

const PGPKey = styled("code", {
  marginLeft: "0.15em",
  wordSpacing: "-0.4em",
});

const Quiet = styled("span", {
  color: theme.colors.mediumLight,
});

const Index = () => {
  return (
    <>
      <H1>
        Hi there! I'm Jake. <Wave>👋</Wave>
      </H1>

      <H2>
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
      </H2>

      <Paragraph>
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
      </Paragraph>

      <Paragraph>
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
          href="https://xkcd.com/1319/"
          title='"Automation" on xkcd'
          lightColor="#ff6200"
          darkColor="#f46c16"
        >
          DevOps automation
        </ColorfulLink>
        .
      </Paragraph>

      <Paragraph>
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
        <ColorfulLink
          href="/birthday/"
          title="🎉 Cranky Birthday Boy on VHS Tape 📼"
          lightColor="#e40088"
          darkColor="#fd40b1"
          css={{
            // rotated 🪄 emoji on hover
            "&:hover": {
              cursor: `url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='24' height='30' style='font-size:24px'><text y='50%' transform='rotate(-70 0 0) translate(-20, 6)'>🪄</text></svg>") 5 5, auto`,
            },
          }}
        >
          the Tooth Fairy
        </ColorfulLink>
        . <Quiet>I've improved a bit since then, I think? 🤷</Quiet>
      </Paragraph>

      <Paragraph>
        Over the years, some of my side projects{" "}
        <ColorfulLink
          href="/leo/"
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
      </Paragraph>

      <Paragraph>
        You can find more of my work on{" "}
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
        <ColorfulLink href="/contact/" title="Send an email" lightColor="#de0c0c" darkColor="#ff5050">
          email
        </ColorfulLink>{" "}
        <Sup>
          <ColorfulLink
            href="/pubkey.asc"
            rel="pgpkey authn"
            title="My Public Key"
            lightColor="#757575"
            darkColor="#959595"
            underline={false}
            openInNewTab
          >
            🔐 <PGPKey>2B0C 9CF2 51E6 9A39</PGPKey>
          </ColorfulLink>
        </Sup>
        ,{" "}
        <ColorfulLink
          href="https://twitter.com/jakejarvis"
          rel="me"
          title="Jake Jarvis on Twitter"
          lightColor="#00acee"
          darkColor="#3bc9ff"
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
      </Paragraph>
    </>
  );
};

export default Index;
