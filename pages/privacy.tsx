import Image from "next/image";
import Link from "next/link";
import Layout from "../components/Layout";
import Container from "../components/Container";
import Content from "../components/Content";
import PageTitle from "../components/page/PageTitle";
import { PrivacyIcon } from "../components/icons";

import faunaImg from "../public/static/images/privacy/fauna_hits.png";

export default function Privacy() {
  return (
    <Layout>
      <Container title="Privacy">
        <PageTitle
          title={
            <>
              <PrivacyIcon /> Privacy
            </>
          }
        />
        <Content>
          <p>Okay, this is an easy one. 😉</p>
          <h2 id="analytics">Analytics</h2>
          <p>
            A simple hit counter on each page tallies an aggregate number of pageviews (i.e.{" "}
            <code>hits = hits + 1</code>). Individual views and identifying (or non-identifying) details are{" "}
            <strong>never stored or logged</strong>.
          </p>
          <p>
            The{" "}
            <a
              href="https://github.com/jakejarvis/jarv.is/blob/main/api/hits.js"
              target="_blank"
              rel="noopener noreferrer"
            >
              serverless function
            </a>{" "}
            and{" "}
            <a
              href="https://github.com/jakejarvis/jarv.is/blob/main/assets/js/src/components/Counter.js"
              target="_blank"
              rel="noopener noreferrer"
            >
              client script
            </a>{" "}
            are open source, and{" "}
            <a href="https://github.com/jakejarvis/website-stats" target="_blank" rel="noopener noreferrer">
              snapshots of the database
            </a>{" "}
            are public.
          </p>
          <Image src={faunaImg} placeholder="blur" alt="The entire database schema." />
          <h2 id="hosting">Hosting</h2>
          <p>
            Pages and first-party assets on this website are served by{" "}
            <a href="https://vercel.com/" target="_blank" rel="noopener noreferrer">
              <strong>▲ Vercel</strong>
            </a>
            . Refer to their{" "}
            <a href="https://vercel.com/legal/privacy-policy" target="_blank" rel="noopener noreferrer">
              privacy policy
            </a>{" "}
            for more information.
          </p>
          <p>
            For a likely excessive level of privacy and security, this website is also mirrored on the{" "}
            <a href="https://www.torproject.org/" target="_blank" rel="noopener noreferrer">
              🧅 Tor network
            </a>{" "}
            at:
          </p>
          <blockquote>
            <p>
              <a
                href="http://jarvis2i2vp4j4tbxjogsnqdemnte5xhzyi7hziiyzxwge3hzmh57zad.onion"
                target="_blank"
                rel="noopener noreferrer"
              >
                <strong>jarvis2i2vp4j4tbxjogsnqdemnte5xhzyi7hziiyzxwge3hzmh57zad.onion</strong>
              </a>
            </p>
          </blockquote>
          <h2 id="third-party">Third-Party Content</h2>
          <p>
            Occasionally, embedded content from third-party services is included in posts, and some may contain tracking
            code that is outside of my control. Please refer to their privacy policies for more information:
          </p>
          <ul>
            <li>
              <a href="https://blog.codepen.io/documentation/privacy/" target="_blank" rel="noopener noreferrer">
                CodePen
              </a>
            </li>
            <li>
              <a href="https://www.facebook.com/policy.php" target="_blank" rel="noopener noreferrer">
                Facebook
              </a>
            </li>
            <li>
              <a
                href="https://docs.github.com/en/github/site-policy/github-privacy-statement"
                target="_blank"
                rel="noopener noreferrer"
              >
                GitHub
              </a>
            </li>
            <li>
              <a href="https://soundcloud.com/pages/privacy" target="_blank" rel="noopener noreferrer">
                SoundCloud
              </a>
            </li>
            <li>
              <a href="https://twitter.com/en/privacy" target="_blank" rel="noopener noreferrer">
                Twitter
              </a>
            </li>
            <li>
              <a href="https://vimeo.com/privacy" target="_blank" rel="noopener noreferrer">
                Vimeo
              </a>
            </li>
            <li>
              <a href="https://policies.google.com/privacy" target="_blank" rel="noopener noreferrer">
                YouTube
              </a>
            </li>
          </ul>
          <h2 id="hcaptcha">Fighting Spam</h2>
          <p>
            Using{" "}
            <a href="https://www.hcaptcha.com/" target="_blank" rel="noopener noreferrer">
              <strong>hCaptcha</strong>
            </a>{" "}
            to fight bot spam on the <Link href="/contact/">contact form</Link> was an easy choice over seemingly
            unavoidable alternatives like{" "}
            <a href="https://developers.google.com/recaptcha/" target="_blank" rel="noopener noreferrer">
              reCAPTCHA
            </a>
            .
          </p>
          <p>
            You can refer to hCaptcha's{" "}
            <a href="https://www.hcaptcha.com/privacy" target="_blank" rel="noopener noreferrer">
              privacy policy
            </a>{" "}
            and{" "}
            <a href="https://www.hcaptcha.com/terms" target="_blank" rel="noopener noreferrer">
              terms of service
            </a>{" "}
            for more details. While some information is sent to the hCaptcha API about your behavior{" "}
            <strong>(on the contact page only)</strong>, at least you won't be helping a certain internet conglomerate{" "}
            <a
              href="https://blog.cloudflare.com/moving-from-recaptcha-to-hcaptcha/"
              target="_blank"
              rel="noopener noreferrer"
            >
              train their self-driving cars
            </a>
            . 🚗
          </p>
          <p>
            I also enabled the setting to donate 100% of my{" "}
            <a href="https://humanprotocol.org/?lng=en-US" target="_blank" rel="noopener noreferrer">
              HMT token
            </a>{" "}
            earnings to the{" "}
            <a href="https://wikimediafoundation.org/" target="_blank" rel="noopener noreferrer">
              Wikimedia Foundation
            </a>
            , for what it's worth. (A few cents, probably... 💰)
          </p>
        </Content>
      </Container>
    </Layout>
  );
}
