import Link from "../../components/Link";
import { createMetadata } from "../../lib/helpers/metadata";

import backgroundImg from "./sundar.jpg";

export const metadata = createMetadata({
  title: "fuckyougoogle.zip",
  description: "This is a horrible idea.",
  canonical: "/zip",
});

const Page = () => {
  return (
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
          ending with file extensions released by us & purchased on our registrar (which i just yeeted btw cuz i&apos;m
          & also my evil superpowers are fueled by my reckless disregard for the greater good of the internet). - xoxo
          sundar <span style={{ color: "#f95757" }}>&lt;3</span>
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
  );
};

export default Page;
