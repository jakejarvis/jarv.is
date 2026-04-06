import { createFileRoute } from "@tanstack/react-router";

import { PageTitle } from "@/components/layout/page-title";
import { createHead } from "@/lib/head";

import backgroundImg from "../../public/images/zip/sundar.jpg";

export const Route = createFileRoute("/zip")({
  head: () =>
    createHead({
      title: "fuckyougoogle.zip 🖕",
      description: "This is a horrible idea.",
      canonical: "/zip",
    }),
  component: ZipPage,
});

const Terminal = () => (
  <div
    className="relative mx-auto my-6 w-full rounded-lg bg-center bg-no-repeat"
    style={{
      backgroundImage: `url(${backgroundImg})`,
    }}
  >
    <code className="border-ring block rounded-lg border border-solid bg-black/60 p-4 text-sm break-all text-white/90 backdrop-blur-sm backdrop-saturate-150">
      <span style={{ color: "#f95757" }}>sundar</span>@
      <span style={{ color: "#3b9dd2" }}>google</span>:<span style={{ color: "#78df55" }}>~</span>${" "}
      <span style={{ color: "#d588fb" }}>mv</span> /root
      <a
        href="https://killedbygoogle.com/"
        style={{ color: "inherit" }}
        className="hover:no-underline"
      >
        /stable_products_that_people_rely_on/
      </a>
      googledomains.zip /tmp/
      <br />
      <span style={{ color: "#f95757" }}>sundar</span>@
      <span style={{ color: "#3b9dd2" }}>google</span>:<span style={{ color: "#78df55" }}>~</span>${" "}
      <span style={{ color: "#d588fb" }}>crontab</span> <span style={{ color: "#fd992a" }}>-l</span>
      <br />
      <br />
      <span style={{ color: "#929292" }}>
        # TODO(someone else): make super duper sure this only deletes actual zip files and *NOT* the
        sketchy domains ending with file extensions released by us &amp; purchased on our registrar
        (which i just yeeted btw cuz i&apos;m &amp; also my evil superpowers are fueled by my
        reckless disregard for the greater good of the internet). - xoxo sundar{" "}
        <span style={{ color: "#f95757" }}>&lt;3</span>
      </span>
      <br />
      <span style={{ color: "#78df55" }}>@monthly</span>
      &nbsp;&nbsp;&nbsp;&nbsp;
      <span style={{ color: "#d588fb" }}>rm</span> <span style={{ color: "#fd992a" }}>-f</span>{" "}
      /tmp/
      <a
        href="https://fuckyougoogle.zip/"
        style={{ color: "inherit" }}
        className="hover:no-underline"
      >
        *.zip
      </a>
      <br />
      <br />
      <span style={{ color: "#f95757" }}>sundar</span>@
      <span style={{ color: "#3b9dd2" }}>google</span>:<span style={{ color: "#78df55" }}>~</span>${" "}
      <span style={{ color: "#d588fb" }}>reboot</span> 0
    </code>
  </div>
);

function ZipPage() {
  return (
    <>
      <PageTitle canonical="https://fuckyougoogle.zip">fuckyougoogle.zip 🖕</PageTitle>

      <div className="prose prose-neutral dark:prose-invert prose-sm max-w-none">
        <Terminal />

        <hr />

        <h3>This reaction seems a little extreme?</h3>

        <p>
          A little-known monopolistic internet conglomorate simply unleashed{" "}
          <a
            href="https://blog.google/products/registry/8-new-top-level-domains-for-dads-grads-tech/"
            target="_blank"
            rel="noopener noreferrer"
          >
            multiple
          </a>{" "}
          TLDs with coincidentally matching binary file extentions onto the web and then abruptly{" "}
          <a
            href="https://newsroom.squarespace.com/blog/squarespace-domains-updates"
            target="_blank"
            rel="noopener noreferrer"
          >
            exited the consumer domain registrar business
          </a>
          , what&rsquo;s the big deal?
        </p>

        <ul>
          <li>
            <strong>Bobby Rauch:</strong>{" "}
            <a
              href="https://medium.com/@bobbyrsec/the-dangers-of-googles-zip-tld-5e1e675e59a5"
              target="_blank"
              rel="noopener noreferrer"
            >
              The Dangers of Google&rsquo;s .zip TLD
            </a>
          </li>
          <li>
            <strong>Fortinet:</strong>{" "}
            <a
              href="https://www.fortinet.com/blog/industry-trends/threat-actors-add-zip-domains-to-phishing-arsenals"
              target="_blank"
              rel="noopener noreferrer"
            >
              Threat Actors Add .zip Domains to Their Phishing Arsenals
            </a>
          </li>
          <li>
            <strong>Cisco Talos:</strong>{" "}
            <a
              href="https://blog.talosintelligence.com/zip-tld-information-leak/"
              target="_blank"
              rel="noopener noreferrer"
            >
              .Zip top-level domains draw potential for information leaks
            </a>
          </li>
          <li>
            <strong>Ars Technica:</strong>{" "}
            <a
              href="https://arstechnica.com/information-technology/2023/05/critics-say-googles-new-zip-and-mov-domains-will-be-a-boon-to-scammers/"
              target="_blank"
              rel="noopener noreferrer"
            >
              Google pushes .zip and .mov domains onto the Internet, and the Internet pushes back
            </a>
          </li>
          <li>
            <strong>Malwarebytes:</strong>{" "}
            <a
              href="https://www.threatdown.com/blog/zip-domains-a-bad-idea-nobody-asked-for/"
              target="_blank"
              rel="noopener noreferrer"
            >
              Zip domains, a bad idea nobody asked for
            </a>
          </li>
          <li>
            <strong>Wired:</strong>{" "}
            <a
              href="https://www.wired.com/story/google-zip-mov-domains-phishing-risks/"
              target="_blank"
              rel="noopener noreferrer"
            >
              The Real Risks in Google&rsquo;s New .Zip and .Mov Domains
            </a>
          </li>
          <li>
            <strong>Netcraft:</strong>{" "}
            <a
              href="https://www.netcraft.com/blog/phishing-attacks-already-using-the-zip-tld/"
              target="_blank"
              rel="noopener noreferrer"
            >
              Phishing attacks already using the .zip TLD
            </a>
          </li>
          <li>
            <strong>Bleeping Computer:</strong>{" "}
            <a
              href="https://www.bleepingcomputer.com/news/security/new-zip-domains-spark-debate-among-cybersecurity-experts/"
              target="_blank"
              rel="noopener noreferrer"
            >
              New ZIP domains spark debate among cybersecurity experts
            </a>
          </li>
          <li>
            <strong>Red Canary:</strong>{" "}
            <a
              href="https://redcanary.com/blog/threat-detection/google-zip-domains/"
              target="_blank"
              rel="noopener noreferrer"
            >
              Broken zippers: Detecting deception with Google&rsquo;s new ZIP domains
            </a>
          </li>
          <li>
            <strong>Kaspersky:</strong>{" "}
            <a
              href="https://usa.kaspersky.com/blog/zip-mov-domain-extension-confusion/28351/"
              target="_blank"
              rel="noopener noreferrer"
            >
              Beware the .zip and .mov domains!
            </a>
          </li>
          <li>
            <strong>Palo Alto Networks:</strong>{" "}
            <a
              href="https://knowledgebase.paloaltonetworks.com/KCSArticleDetail?id=kA14u000000g1wOCAQ"
              target="_blank"
              rel="noopener noreferrer"
            >
              New Top Level Domains .zip and .mov open the door for new attacks
            </a>
          </li>
          <li>
            <strong>Google, twenty years ago:</strong>{" "}
            <a
              href="https://web.archive.org/web/20050204181615/http://investor.google.com/conduct.html"
              target="_blank"
              rel="noopener noreferrer"
            >
              &ldquo;Don&rsquo;t be evil&rdquo;
            </a>
          </li>
        </ul>
      </div>
    </>
  );
}
