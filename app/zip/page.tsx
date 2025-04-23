import PageTitle from "../../components/PageTitle";
import Link from "../../components/Link";
import { H3 } from "../../components/Heading";
import HorizontalRule from "../../components/HorizontalRule";
import UnorderedList, { ListItem } from "../../components/List";
import Comments from "../../components/Comments";
import { createMetadata } from "../../lib/helpers/metadata";

import backgroundImg from "./sundar.jpg";

export const metadata = createMetadata({
  title: "fuckyougoogle.zip 🖕",
  description: "This is a horrible idea.",
  canonical: "/zip",
});

const Page = () => {
  return (
    <>
      <PageTitle canonical="https://fuckyougoogle.zip">fuckyougoogle.zip 🖕</PageTitle>

      <div
        style={{
          position: "relative",
          width: "100%",
          margin: "1em auto",
          backgroundImage: `url(${backgroundImg.src})`,
          backgroundRepeat: "repeat",
          backgroundPosition: "center",
          borderRadius: "0.6em",
        }}
      >
        <code
          style={{
            backgroundColor: "var(--colors-background-header)",
            backdropFilter: "saturate(180%) blur(5px))",
            display: "block",
            overflowX: "auto",
            padding: "1em",
            fontSize: "0.9em",
            tabSize: 2,
            border: "1px solid var(--colors-kinda-light)",
            borderRadius: "0.6em",
          }}
        >
          <span style={{ color: "#f95757" }}>sundar</span>@<span style={{ color: "#3b9dd2" }}>google</span>:
          <span style={{ color: "#78df55" }}>~</span>$ <span style={{ color: "#d588fb" }}>mv</span> /root
          <Link href="https://killedbygoogle.com/" style={{ color: "inherit" }} plain>
            /stable_products_that_people_rely_on/
          </Link>
          googledomains.zip /tmp/
          <br />
          <span style={{ color: "#f95757" }}>sundar</span>@<span style={{ color: "#3b9dd2" }}>google</span>:
          <span style={{ color: "#78df55" }}>~</span>$ <span style={{ color: "#d588fb" }}>crontab</span>{" "}
          <span style={{ color: "#fd992a" }}>-l</span>
          <br />
          <br />
          <span style={{ color: "#929292" }}>
            # TODO(someone else): make super duper sure this only deletes actual zip files and *NOT* the sketchy domains
            ending with file extensions released by us & purchased on our registrar (which i just yeeted btw cuz
            i&apos;m & also my evil superpowers are fueled by my reckless disregard for the greater good of the
            internet). - xoxo sundar <span style={{ color: "#f95757" }}>&lt;3</span>
          </span>
          <br />
          <span style={{ color: "#78df55" }}>@monthly</span>&nbsp;&nbsp;&nbsp;&nbsp;
          <span style={{ color: "#d588fb" }}>rm</span> <span style={{ color: "#fd992a" }}>-f</span> /tmp/
          <Link href="https://fuckyougoogle.zip/" style={{ color: "inherit" }} plain>
            *.zip
          </Link>
          <br />
          <br />
          <span style={{ color: "#f95757" }}>sundar</span>@<span style={{ color: "#3b9dd2" }}>google</span>:
          <span style={{ color: "#78df55" }}>~</span>$ <span style={{ color: "#d588fb" }}>reboot</span> 0
        </code>
      </div>

      <HorizontalRule />

      <H3>This reaction seems a little extreme?</H3>

      <p>
        A little-known monopolistic internet conglomorate simply unleashed{" "}
        <Link href="https://blog.google/products/registry/8-new-top-level-domains-for-dads-grads-tech/">multiple</Link>{" "}
        TLDs with coincidentally matching binary file extentions onto the web and then abruptly{" "}
        <Link href="https://newsroom.squarespace.com/blog/squarespace-domains-updates">
          exited the consumer domain registrar business
        </Link>
        , what&rsquo;s the big deal?
      </p>

      <UnorderedList>
        <ListItem>
          <strong>Bobby Rauch:</strong>{" "}
          <Link href="https://medium.com/@bobbyrsec/the-dangers-of-googles-zip-tld-5e1e675e59a5">
            The Dangers of Google&rsquo;s .zip TLD
          </Link>
        </ListItem>
        <ListItem>
          <strong>Fortinet:</strong>{" "}
          <Link href="https://www.fortinet.com/blog/industry-trends/threat-actors-add-zip-domains-to-phishing-arsenals">
            Threat Actors Add .zip Domains to Their Phishing Arsenals
          </Link>
        </ListItem>
        <ListItem>
          <strong>Cisco Talos:</strong>{" "}
          <Link href="https://blog.talosintelligence.com/zip-tld-information-leak/">
            .Zip top-level domains draw potential for information leaks
          </Link>
        </ListItem>
        <ListItem>
          <strong>Ars Technica:</strong>{" "}
          <Link href="https://arstechnica.com/information-technology/2023/05/critics-say-googles-new-zip-and-mov-domains-will-be-a-boon-to-scammers/">
            Google pushes .zip and .mov domains onto the Internet, and the Internet pushes back
          </Link>
        </ListItem>
        <ListItem>
          <strong>Malwarebytes:</strong>{" "}
          <Link href="https://www.threatdown.com/blog/zip-domains-a-bad-idea-nobody-asked-for/">
            Zip domains, a bad idea nobody asked for
          </Link>
        </ListItem>
        <ListItem>
          <strong>Wired:</strong>{" "}
          <Link href="https://www.wired.com/story/google-zip-mov-domains-phishing-risks/">
            The Real Risks in Google&rsquo;s New .Zip and .Mov Domains
          </Link>
        </ListItem>
        <ListItem>
          <strong>Netcraft:</strong>{" "}
          <Link href="https://www.netcraft.com/blog/phishing-attacks-already-using-the-zip-tld/">
            Phishing attacks already using the .zip TLD
          </Link>
        </ListItem>
        <ListItem>
          <strong>Bleeping Computer:</strong>{" "}
          <Link href="https://www.bleepingcomputer.com/news/security/new-zip-domains-spark-debate-among-cybersecurity-experts/">
            New ZIP domains spark debate among cybersecurity experts
          </Link>
        </ListItem>
        <ListItem>
          <strong>Red Canary:</strong>{" "}
          <Link href="https://redcanary.com/blog/threat-detection/google-zip-domains/">
            Broken zippers: Detecting deception with Google&rsquo;s new ZIP domains
          </Link>
        </ListItem>
        <ListItem>
          <strong>Kaspersky:</strong>{" "}
          <Link href="https://usa.kaspersky.com/blog/zip-mov-domain-extension-confusion/28351/">
            Beware the .zip and .mov domains!
          </Link>
        </ListItem>
        <ListItem>
          <strong>Palo Alto Networks:</strong>{" "}
          <Link href="https://knowledgebase.paloaltonetworks.com/KCSArticleDetail?id=kA14u000000g1wOCAQ">
            New Top Level Domains .zip and .mov open the door for new attacks
          </Link>
        </ListItem>
        <ListItem>
          <strong>Google, twenty years ago:</strong>{" "}
          <Link href="https://web.archive.org/web/20050204181615/http://investor.google.com/conduct.html">
            &ldquo;Don&rsquo;t be evil&rdquo;
          </Link>
        </ListItem>
      </UnorderedList>

      <HorizontalRule />

      <Comments title="fuckyougoogle.zip" />
    </>
  );
};

export default Page;
