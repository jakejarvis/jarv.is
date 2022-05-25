/* eslint-disable camelcase */

import { NextSeo } from "next-seo";
import Layout from "../components/Layout";
import Content from "../components/Content";
import PageTitle from "../components/PageTitle";
import Link from "../components/Link";
import Figure from "../components/Figure";
import IFrame from "../components/IFrame";
import CodeInline from "../components/CodeInline";
import HorizontalRule from "../components/HorizontalRule";
import Marquee from "../components/Marquee";
import { Windows95Logo } from "../components/Icons";
import { styled } from "../lib/styles/stitches.config";
import type { ReactElement } from "react";

import img_wayback from "../public/static/images/previously/wayback.png";
import img_2002_02 from "../public/static/images/previously/2002_02.png";
import img_2002_10 from "../public/static/images/previously/2002_10.png";
import img_2003_08 from "../public/static/images/previously/2003_08.png";
import img_2004_11 from "../public/static/images/previously/2004_11.png";
import img_2006_04 from "../public/static/images/previously/2006_04.png";
import img_2006_05 from "../public/static/images/previously/2006_05.png";
import img_2007_01 from "../public/static/images/previously/2007_01.png";
import img_2007_04 from "../public/static/images/previously/2007_04.png";
import img_2007_05 from "../public/static/images/previously/2007_05.png";
import img_2009_07 from "../public/static/images/previously/2009_07.png";
import img_2012_09 from "../public/static/images/previously/2012_09.png";
import img_2018_04 from "../public/static/images/previously/2018_04.png";
import img_2020_03 from "../public/static/images/previously/2020_03.png";

const WindowsIcon = styled(Windows95Logo, {
  width: "1.2em",
  height: "1.2em",
  verticalAlign: "-0.15em",
  marginRight: "0.15em",
  fill: "currentColor",
});

const Previously = () => (
  <>
    <NextSeo
      title="Previously on..."
      description="An incredibly embarrassing and somewhat painful trip down this site's memory lane..."
      openGraph={{
        title: "Previously on...",
      }}
    />

    <PageTitle>🕰️ Previously on...</PageTitle>

    <Content>
      <Figure
        src={img_wayback}
        href="https://web.archive.org/web/20010501000000*/jakejarvis.com"
        alt="Timeline of this website's past."
        priority
      >
        ...the <Link href="https://web.archive.org/web/20010501000000*/jakejarvis.com">Cringey Chronicles&trade;</Link>{" "}
        of this website's past.
      </Figure>

      <HorizontalRule />

      <Marquee>
        🚨 <strong>Trigger warning:</strong> excessive marquees, animated GIFs, Comic Sans, popups,{" "}
        <CodeInline>
          color: <span style={{ color: "#32cd32" }}>limegreen</span>
        </CodeInline>{" "}
        ahead...
      </Marquee>

      <p style={{ marginTop: 0 }}>
        <Link
          href="/y2k/"
          prefetch={false}
          css={{
            "&:hover": {
              // classic windows 9x hand cursor easter egg
              cursor: `url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgAgMAAAAOFJJnAAAACVBMVEVHcEwAAAD///8W1S+BAAAAAXRSTlMAQObYZgAAAEdJREFUeAFjoAVghTGkHIhghMAYmQEwxlIYYxlYlSiQMQEsELUKyli1ahWYwQZjMGIwGLKQGA4QA1EYEP0rGVAZrKGhSF4BAHw/HsVwshytAAAAAElFTkSuQmCC") 16 12, auto`,
            },
          }}
        >
          <WindowsIcon /> Click here for the{" "}
          <strong>
            <em>full</em>
          </strong>{" "}
          experience anyway.
        </Link>
      </p>

      <figure style={{ margin: 0 }}>
        <IFrame
          src="https://jakejarvis.github.io/my-first-website/"
          title="My Terrible, Horrible, No Good, Very Bad First Website"
          height={500}
          allowScripts
          css={{ margin: "0.6em 0" }}
        />
        <figcaption>
          <Link href="https://jakejarvis.github.io/my-first-website/">November 2001</Link> (
          <Link href="https://github.com/jakejarvis/my-first-website">view source</Link>)
        </figcaption>
      </figure>

      <HorizontalRule />

      <Figure src={img_2002_02}>February 2002</Figure>

      <HorizontalRule />

      <Figure src={img_2002_10}>October 2002</Figure>

      <HorizontalRule />

      <Figure src={img_2003_08}>August 2003</Figure>

      <HorizontalRule />

      <Figure src={img_2004_11}>November 2004</Figure>

      <HorizontalRule />

      <Figure src={img_2006_04}>April 2006</Figure>

      <HorizontalRule />

      <Figure src={img_2006_05}>May 2006</Figure>

      <HorizontalRule />

      <Figure src={img_2007_01}>January 2007</Figure>

      <HorizontalRule />

      <Figure src={img_2007_04}>April 2007</Figure>

      <HorizontalRule />

      <Figure src={img_2007_05}>May 2007</Figure>

      <HorizontalRule />

      <Figure src={img_2009_07}>July 2009</Figure>

      <HorizontalRule />

      <Figure src={img_2012_09} href="https://focused-knuth-7bc10d.netlify.app/" alt="September 2012">
        <Link href="https://focused-knuth-7bc10d.netlify.app/">September 2012</Link> (
        <Link href="https://github.com/jakejarvis/jarv.is/tree/v1">view source</Link>)
      </Figure>

      <HorizontalRule />

      <Figure src={img_2018_04} href="https://hungry-mayer-40e790.netlify.app/" alt="April 2018">
        <Link href="https://hungry-mayer-40e790.netlify.app/">April 2018</Link> (
        <Link href="https://github.com/jakejarvis/jarv.is/tree/v2">view source</Link>)
      </Figure>

      <HorizontalRule />

      <Figure src={img_2020_03} href="https://quiet-truffle-92842d.netlify.app/" alt="March 2020">
        <Link href="https://quiet-truffle-92842d.netlify.app/">March 2020</Link> (
        <Link href="https://github.com/jakejarvis/jarv.is-hugo">view source</Link>)
      </Figure>
    </Content>
  </>
);

// a complete sh*tshow of "global" overrides, mainly to compensate for font change
Previously.getLayout = (page: ReactElement) => {
  return (
    <Layout
      css={{
        fontFamily: '"Comic Neue", "Comic Sans MS", "Comic Sans", sans-serif',
        fontWeight: 600,

        header: {
          // title text
          "& > nav > a:first-of-type > span:last-of-type": {
            fontSize: "1.4em",
            fontWeight: 700,
          },
          // menu item text
          "& > nav > ul > li > a > span": {
            fontSize: "1.1em",
            fontWeight: 700,
            lineHeight: 1.1,
          },
        },

        "main > div > div": {
          fontSize: "1.1em",
          textAlign: "center",

          "& em": {
            fontStyle: "revert !important",
          },
          "& p": {
            fontSize: "0.95em",
          },
          "& strong": {
            fontWeight: 900,
          },
          "& code": {
            fontSize: "0.85em",
            fontWeight: 400,
          },
          "& hr": {
            margin: "1em auto",
          },
          "& figcaption": {
            fontSize: "0.9em",
            lineHeight: 1.5,
            color: "$medium",
            textAlign: "center",
          },
          "& figure:last-of-type": {
            marginBottom: 0,
          },
        },

        "footer > div": {
          fontSize: "0.95em",
        },
      }}
    >
      {page}
    </Layout>
  );
};

export default Previously;
