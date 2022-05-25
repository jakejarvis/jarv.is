import { NextSeo } from "next-seo";
import Content from "../components/Content";
import PageTitle from "../components/PageTitle";
import Link from "../components/Link";
import Image from "../components/Image";
import IFrame from "../components/IFrame";
import Blockquote from "../components/Blockquote";
import CodeInline from "../components/CodeInline";
import { H2 } from "../components/Heading";
import { UnorderedList, ListItem } from "../components/List";
import { fathomSiteId, siteDomain } from "../lib/config";

import faunaImg from "../public/static/images/privacy/fauna_hits.png";

const Privacy = () => {
  return (
    <>
      <NextSeo
        title="Privacy"
        openGraph={{
          title: "Privacy",
        }}
      />

      <PageTitle>🕵️ Privacy</PageTitle>

      <Content>
        <p>Okay, this is an easy one. 😉</p>

        <H2 id="hosting">Hosting</H2>

        <p>
          Pages and first-party assets on this website are served by{" "}
          <Link href="https://vercel.com/">
            <strong>▲ Vercel</strong>
          </Link>
          . Refer to their <Link href="https://vercel.com/legal/privacy-policy">privacy policy</Link> for more
          information.
        </p>

        <p>
          For a likely excessive level of privacy and security, this website is also mirrored on the{" "}
          <Link href="https://www.torproject.org/">🧅 Tor network</Link> at:
        </p>

        <Blockquote css={{ overflowWrap: "break-word" }}>
          <Link href="http://jarvis2i2vp4j4tbxjogsnqdemnte5xhzyi7hziiyzxwge3hzmh57zad.onion">
            <strong>jarvis2i2vp4j4tbxjogsnqdemnte5xhzyi7hziiyzxwge3hzmh57zad.onion</strong>
          </Link>
        </Blockquote>

        <H2 id="analytics">Analytics</H2>

        <p>
          A very simple hit counter on each blog post tallies an aggregate number of pageviews (i.e.{" "}
          <CodeInline>hits = hits + 1</CodeInline>) in a <Link href="https://fauna.com/">Fauna</Link> database.
          Individual views and identifying (or non-identifying) details are <strong>never stored or logged</strong>.
        </p>

        <p>
          The <Link href="https://github.com/jakejarvis/jarv.is/blob/main/pages/api/hits.ts">serverless function</Link>{" "}
          and{" "}
          <Link href="https://github.com/jakejarvis/jarv.is/blob/main/components/HitCounter/HitCounter.tsx">
            client script
          </Link>{" "}
          are open source, and <Link href="https://github.com/jakejarvis/website-stats">snapshots of the database</Link>{" "}
          are public.
        </p>

        <Image src={faunaImg} alt="The entire database schema." />

        <p>
          <Link href="https://usefathom.com/ref/ZEYG0O">
            <strong>Fathom Analytics</strong>
          </Link>
          , a <em>very</em> <Link href="https://usefathom.com/privacy-focused-web-analytics">privacy-focused</Link>{" "}
          service, is also used to gain insights into referrers, search terms, etc.{" "}
          <strong>without collecting anything identifiable about you</strong>. (My <Link href="/stats/">dashboard</Link>{" "}
          is completely public, too!)
        </p>

        <IFrame
          src={`https://app.usefathom.com/share/${fathomSiteId}/${siteDomain}`}
          title="Fathom Analytics dashboard"
          height={500}
          allowScripts
        />

        <H2 id="third-party">Third-Party Content</H2>

        <p>
          Occasionally, embedded content from third-party services is included in posts, and some may contain tracking
          code that is outside of my control. Please refer to their privacy policies for more information:
        </p>

        <UnorderedList>
          <ListItem>
            <Link href="https://blog.codepen.io/documentation/privacy/">CodePen</Link>
          </ListItem>
          <ListItem>
            <Link href="https://www.facebook.com/policy.php">Facebook</Link>
          </ListItem>
          <ListItem>
            <Link href="https://docs.github.com/en/github/site-policy/github-privacy-statement">GitHub</Link>
          </ListItem>
          <ListItem>
            <Link href="https://soundcloud.com/pages/privacy">SoundCloud</Link>
          </ListItem>
          <ListItem>
            <Link href="https://twitter.com/en/privacy">Twitter</Link>
          </ListItem>
          <ListItem>
            <Link href="https://vimeo.com/privacy">Vimeo</Link>
          </ListItem>
          <ListItem>
            <Link href="https://policies.google.com/privacy">YouTube</Link>
          </ListItem>
        </UnorderedList>

        <H2 id="hcaptcha">Fighting Spam</H2>

        <p>
          Using{" "}
          <Link href="https://www.hcaptcha.com/">
            <strong>hCaptcha</strong>
          </Link>{" "}
          to fight bot spam on the <Link href="/contact/">contact form</Link> was an easy choice over seemingly
          unavoidable alternatives like <Link href="https://developers.google.com/recaptcha/">reCAPTCHA</Link>.
        </p>

        <p>
          You can refer to hCaptcha's <Link href="https://www.hcaptcha.com/privacy">privacy policy</Link> and{" "}
          <Link href="https://www.hcaptcha.com/terms">terms of service</Link> for more details. While some information
          is sent to the hCaptcha API about your behavior <strong>(on the contact page only)</strong>, at least you
          won't be helping a certain internet conglomerate{" "}
          <Link href="https://blog.cloudflare.com/moving-from-recaptcha-to-hcaptcha/">
            train their self-driving cars
          </Link>
          . 🚗
        </p>

        <p>
          I also enabled the setting to donate 100% of my{" "}
          <Link href="https://humanprotocol.org/?lng=en-US">HMT token</Link> earnings to the{" "}
          <Link href="https://wikimediafoundation.org/">Wikimedia Foundation</Link>, for what it's worth. (A few cents,
          probably... 💰)
        </p>
      </Content>
    </>
  );
};

export default Privacy;
