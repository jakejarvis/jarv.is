import Content from "../../components/Content";
import Link from "../../components/Link";
import CodeBlock from "../../components/CodeBlock/CodeBlock";
import type { Metadata } from "next";

import backgroundImg from "../../public/static/images/zip/bg.jpg";

export const metadata: Metadata = {
  title: "fuckyougoogle.zip",
  description: "This is a horrible idea.",
  openGraph: {
    title: "fuckyougoogle.zip",
  },
};

export default async function Page() {
  return (
    <Content
      style={{
        backgroundImage: `url(${backgroundImg.src})`,
        backgroundRepeat: "repeat",
        backgroundPosition: "center",
        borderRadius: "var(--radii-corner)",
      }}
    >
      <CodeBlock
        style={{
          backgroundColor: "var(--colors-backgroundHeader)",
          backdropFilter: "saturate(180%) blur(5px))",
        }}
      >
        <span style={{ color: "var(--colors-codeNamespace)" }}>sundar</span>@
        <span style={{ color: "var(--colors-codeKeyword)" }}>google</span>:
        <span style={{ color: "var(--colors-codeAttribute)" }}>~</span>${" "}
        <span style={{ color: "var(--colors-codeLiteral)" }}>mv</span> /root
        <Link href="https://killedbygoogle.com/" style={{ color: "inherit" }} underline={false}>
          /stable_products_that_people_rely_on/
        </Link>
        googledomains.zip /tmp/
        <br />
        <span style={{ color: "var(--colors-codeNamespace)" }}>sundar</span>@
        <span style={{ color: "var(--colors-codeKeyword)" }}>google</span>:
        <span style={{ color: "var(--colors-codeAttribute)" }}>~</span>${" "}
        <span style={{ color: "var(--colors-codeLiteral)" }}>crontab</span>{" "}
        <span style={{ color: "var(--colors-codeVariable)" }}>-l</span>
        <br />
        <br />
        <span style={{ color: "var(--colors-codeComment)" }}>
          # TODO(someone else): make super duper sure this only deletes actual zip files and *NOT* the sketchy domains
          ending with file extensions released by us & purchased on our registrar (which i just yeeted btw cuz i'm bored
          & also my evil superpowers are fueled by my reckless disregard for the greater good of the internet). - xoxo
          sundar <span style={{ color: "var(--colors-codeNamespace)" }}>&lt;3</span>
        </span>
        <br />
        <span style={{ color: "var(--colors-codeAttribute)" }}>@monthly</span>&nbsp;&nbsp;&nbsp;&nbsp;
        <span style={{ color: "var(--colors-codeLiteral)" }}>rm</span>{" "}
        <span style={{ color: "var(--colors-codeVariable )" }}>-f</span> /tmp/
        <Link href="https://fuckyougoogle.zip/" style={{ color: "inherit" }} underline={false}>
          *.zip
        </Link>
        <br />
        <br />
        <span style={{ color: "var(--colors-codeNamespace)" }}>sundar</span>@
        <span style={{ color: "var(--colors-codeKeyword)" }}>google</span>:
        <span style={{ color: "var(--colors-codeAttribute)" }}>~</span>${" "}
        <span style={{ color: "var(--colors-codeLiteral)" }}>reboot</span> 0
      </CodeBlock>
    </Content>
  );
}
