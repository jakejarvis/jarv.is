import { NextSeo } from "next-seo";
import Layout from "../components/Layout";
import Content from "../components/Content";
import Link from "../components/Link";
import CodeBlock from "../components/CodeBlock/CodeBlock";
import { styled, theme } from "../lib/styles/stitches.config";
import type { ReactElement } from "react";

import backgroundImg from "../public/static/images/zip/bg.jpg";

const Background = styled("main", {
  display: "flex",
  width: "100%",
  minHeight: "450px",
  padding: "1.5em 0",
  justifyContent: "center",
  alignItems: "center",
  backgroundImage: `url(${backgroundImg.src})`,
  backgroundRepeat: "repeat",
  backgroundPosition: "center",
});

const Container = styled("div", {
  maxWidth: theme.sizes.maxLayoutWidth,
  margin: "0 auto",
  display: "block",
});

const Zip = () => {
  return (
    <>
      <NextSeo
        title="fuckyougoogle.zip"
        description="This is a horrible idea."
        openGraph={{
          title: "fuckyougoogle.zip",
        }}
      />

      <Content>
        <CodeBlock
          style={{
            backgroundColor: "var(--colors-backgroundHeader)",
            backdropFilter: "saturate(180%) blur(5px))",
          }}
        >
          <span style={{ color: theme.colors.codeNamespace.computedValue }}>sundar</span>@
          <span style={{ color: theme.colors.codeKeyword.computedValue }}>google</span>:
          <span style={{ color: theme.colors.codeAttribute.computedValue }}>~</span>${" "}
          <span style={{ color: theme.colors.codeLiteral.computedValue }}>mv</span> /root
          <Link href="https://killedbygoogle.com/" style={{ color: "inherit" }} underline={false}>
            /stable_products_that_people_rely_on/
          </Link>
          googledomains.zip /tmp/
          <br />
          <span style={{ color: theme.colors.codeNamespace.computedValue }}>sundar</span>@
          <span style={{ color: theme.colors.codeKeyword.computedValue }}>google</span>:
          <span style={{ color: theme.colors.codeAttribute.computedValue }}>~</span>${" "}
          <span style={{ color: theme.colors.codeLiteral.computedValue }}>crontab</span>{" "}
          <span style={{ color: theme.colors.codeVariable.computedValue }}>-l</span>
          <br />
          <br />
          <span style={{ color: theme.colors.codeComment.computedValue }}>
            # TODO(someone else): make super duper sure this only deletes actual zip files and *NOT* the sketchy domains
            ending with file extensions released by us & purchased on our registrar (which i just yeeted btw cuz i'm
            bored & also my evil superpowers are fueled by my reckless disregard for the greater good of the internet).
            - xoxo sundar <span style={{ color: theme.colors.codeNamespace.computedValue }}>&lt;3</span>
          </span>
          <br />
          <span style={{ color: theme.colors.codeAttribute.computedValue }}>@monthly</span>&nbsp;&nbsp;&nbsp;&nbsp;
          <span style={{ color: theme.colors.codeLiteral.computedValue }}>rm</span>{" "}
          <span style={{ color: theme.colors.codeVariable.computedValue }}>-f</span> /tmp/
          <Link href="https://fuckyougoogle.zip/" style={{ color: "inherit" }} underline={false}>
            *.zip
          </Link>
          <br />
          <br />
          <span style={{ color: theme.colors.codeNamespace.computedValue }}>sundar</span>@
          <span style={{ color: theme.colors.codeKeyword.computedValue }}>google</span>:
          <span style={{ color: theme.colors.codeAttribute.computedValue }}>~</span>${" "}
          <span style={{ color: theme.colors.codeLiteral.computedValue }}>reboot</span> 0
        </CodeBlock>
      </Content>
    </>
  );
};

// disable layout's default styles so the wallpaper component can go edge-to-edge:
Zip.getLayout = (page: ReactElement) => {
  return (
    <Layout container={false}>
      <Background>
        <Container>{page}</Container>
      </Background>
    </Layout>
  );
};

export default Zip;
