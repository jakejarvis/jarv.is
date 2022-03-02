/* eslint-disable camelcase */

import Head from "next/head";
import { NextSeo } from "next-seo";
import Content from "../components/Content/Content";
import PageTitle from "../components/PageTitle/PageTitle";
import Link from "../components/Link/Link";
import Figure from "../components/Figure/Figure";
import IFrame from "../components/IFrame/IFrame";
import HorizontalRule from "../components/HorizontalRule/HorizontalRule";

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

const Previously = () => (
  <>
    <Head>
      {/* a complete sh*tshow of overrides, mainly to compensate for font change */}
      <style
        dangerouslySetInnerHTML={{
          __html: `
body {
  font-family: "Comic Neue", "Comic Sans MS", "Comic Sans", sans-serif !important;
  font-weight: 600 !important;
}
/* left header */
header nav > a:first-of-type span:last-of-type {
  font-size: 1.4em !important;
  font-weight: 700 !important;
}
/* right header */
header nav ul a span {
  font-size: 1.1em !important;
  font-weight: 700 !important;
  line-height: 1.1;
}
/* content */
main > div > div {
  font-size: 1.1em !important;
  text-align: center;
}
main > div > div p {
  font-size: 0.95em;
}
main > div > div strong {
  font-weight: 900;
}
main > div > div code {
  font-size: 0.85em;
  font-weight: 400;
}
main > div > div figure:last-of-type {
  margin-bottom: 0;
}
/* footer */
footer > div {
  font-size: 0.95em !important;
}
/* components */
figcaption,
.iframe_caption {
  margin-top: 0.2em;
  font-size: 0.9em;
  line-height: 1.5;
  color: var(--medium);
  text-align: center;
}
hr {
  margin: 1em auto !important;
}
iframe {
  margin-bottom: 0.6em !important;
}`,
        }}
      />
    </Head>

    <NextSeo
      title="Previously on..."
      description="An incredibly embarrassing and somewhat painful trip down this site's memory lane..."
      openGraph={{
        title: "Previously on...",
      }}
    />

    <PageTitle>🕰️ Previously on...</PageTitle>

    <Content>
      <Figure src={img_wayback} alt="Timeline of this website's past." priority>
        ...the{" "}
        <Link
          href="https://web.archive.org/web/20010501000000*/jakejarvis.com"
          target="_blank"
          rel="noopener noreferrer"
        >
          Cringey Chronicles&trade;
        </Link>{" "}
        of this website's past.
      </Figure>

      <HorizontalRule />

      <p>
        🚨 <strong>Trigger warning:</strong> marquees, Comic Sans MS, popups,{" "}
        <code>
          color: <span style={{ color: "#32cd32" }}>limegreen</span>
        </code>
        ...{" "}
        <Link href="/y2k/" prefetch={false}>
          Click for the{" "}
          <strong>
            <em>FULL</em>
          </strong>{" "}
          experience anyway.
        </Link>
      </p>

      <IFrame
        src="https://jakejarvis.github.io/my-first-website/"
        title="My Terrible, Horrible, No Good, Very Bad First Website"
        height={500}
        allowScripts
      />
      <p className="iframe_caption">
        November 2001 (
        <Link href="https://github.com/jakejarvis/my-first-website" target="_blank" rel="noopener noreferrer">
          archived source
        </Link>
        )
      </p>

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

      <Figure src={img_2012_09} alt="September 2012">
        September 2012 (
        <Link href="https://github.com/jakejarvis/jarv.is/tree/v1" target="_blank" rel="noopener noreferrer">
          archived source
        </Link>
        )
      </Figure>

      <HorizontalRule />

      <Figure src={img_2018_04} alt="April 2018">
        April 2018 (
        <Link href="https://github.com/jakejarvis/jarv.is/tree/v2" target="_blank" rel="noopener noreferrer">
          archived source
        </Link>
        )
      </Figure>

      <HorizontalRule />

      <Figure src={img_2020_03} alt="March 2020">
        March 2020 (
        <Link href="https://github.com/jakejarvis/jarv.is/tree/v3" target="_blank" rel="noopener noreferrer">
          archived source
        </Link>
        )
      </Figure>
    </Content>
  </>
);

export default Previously;
