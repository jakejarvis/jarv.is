// import Layout from "../../components/Layout";
import Content from "../../components/Content";
import PageTitle from "../../components/PageTitle";
import Link from "../../components/Link";
import Figure from "../../components/Figure";
import IFrame from "../../components/IFrame";
import CodeInline from "../../components/CodeInline";
import HorizontalRule from "../../components/HorizontalRule";
import { SiWindows95 } from "react-icons/si";
import { ComicNeue } from "../../lib/styles/fonts";
import { metadata as defaultMetadata } from "../layout";
import type { Metadata } from "next";

import styles from "./styles.module.css";

import img_wayback from "../../public/static/images/previously/wayback.png";
import img_2002_02 from "../../public/static/images/previously/2002_02.png";
import img_2002_10 from "../../public/static/images/previously/2002_10.png";
import img_2003_08 from "../../public/static/images/previously/2003_08.png";
import img_2004_11 from "../../public/static/images/previously/2004_11.png";
import img_2006_04 from "../../public/static/images/previously/2006_04.png";
import img_2006_05 from "../../public/static/images/previously/2006_05.png";
import img_2007_01 from "../../public/static/images/previously/2007_01.png";
import img_2007_04 from "../../public/static/images/previously/2007_04.png";
import img_2007_05 from "../../public/static/images/previously/2007_05.png";
import img_2009_07 from "../../public/static/images/previously/2009_07.png";
import img_2012_09 from "../../public/static/images/previously/2012_09.png";
import img_2018_04 from "../../public/static/images/previously/2018_04.png";
import img_2020_03 from "../../public/static/images/previously/2020_03.png";

export const metadata: Metadata = {
  title: "Previously on...",
  description: "An incredibly embarrassing and somewhat painful trip down this site's memory lane...",
  openGraph: {
    ...defaultMetadata.openGraph,
    title: "Previously on...",
    url: "/previously",
  },
  alternates: {
    ...defaultMetadata.alternates,
    canonical: "/previously",
  },
};

export default async function Page() {
  return (
    <>
      <PageTitle>🕰️ Previously on...</PageTitle>

      <Content
        className={styles.wackyWrapper}
        style={{
          fontFamily: `${ComicNeue.style.fontFamily}, var(--fonts-sans)`,
        }}
      >
        <Figure
          src={img_wayback}
          href="https://web.archive.org/web/20010501000000*/jakejarvis.com"
          alt="Timeline of this website's past."
          priority
          className={styles.screenshot}
        >
          ...the{" "}
          <Link href="https://web.archive.org/web/20010501000000*/jakejarvis.com">Cringey Chronicles&trade;</Link> of
          this website's past.
        </Figure>

        <HorizontalRule className={styles.divider} />

        <p style={{ marginBottom: "0.5em" }}>
          🚨 Trigger warning: excessive marquees, animated GIFs, Comic Sans, popups,{" "}
          <CodeInline
            style={{
              fontSize: "0.8em",
              fontWeight: 400,
            }}
          >
            color: <span style={{ color: "#32cd32" }}>limegreen</span>
          </CodeInline>{" "}
          ahead...
        </p>

        <p style={{ fontSize: "0.95em", marginBottom: "0.5em" }}>
          <Link href="/y2k">
            <SiWindows95 className={styles.windowsLogo} /> Click here for the <em>full</em> experience anyway.
          </Link>
        </p>

        <figure className={styles.screenshot}>
          <IFrame
            src="https://jakejarvis.github.io/my-first-website/"
            title="My Terrible, Horrible, No Good, Very Bad First Website"
            height={500}
            allowScripts
            style={{ margin: "0.6em 0" }}
          />
          <figcaption>
            <Link href="https://jakejarvis.github.io/my-first-website/">November 2001</Link> (
            <Link href="https://github.com/jakejarvis/my-first-website">view source</Link>)
          </figcaption>
        </figure>

        <HorizontalRule className={styles.divider} />

        <Figure src={img_2002_02} className={styles.screenshot}>
          February 2002
        </Figure>

        <HorizontalRule className={styles.divider} />

        <Figure src={img_2002_10} className={styles.screenshot}>
          October 2002
        </Figure>

        <HorizontalRule className={styles.divider} />

        <Figure src={img_2003_08} className={styles.screenshot}>
          August 2003
        </Figure>

        <HorizontalRule className={styles.divider} />

        <Figure src={img_2004_11} className={styles.screenshot}>
          November 2004
        </Figure>

        <HorizontalRule className={styles.divider} />

        <Figure src={img_2006_04} className={styles.screenshot}>
          April 2006
        </Figure>

        <HorizontalRule className={styles.divider} />

        <Figure src={img_2006_05} className={styles.screenshot}>
          May 2006
        </Figure>

        <HorizontalRule className={styles.divider} />

        <Figure src={img_2007_01} className={styles.screenshot}>
          January 2007
        </Figure>

        <HorizontalRule className={styles.divider} />

        <Figure src={img_2007_04} className={styles.screenshot}>
          April 2007
        </Figure>

        <HorizontalRule className={styles.divider} />

        <Figure src={img_2007_05} className={styles.screenshot}>
          May 2007
        </Figure>

        <HorizontalRule className={styles.divider} />

        <Figure src={img_2009_07} className={styles.screenshot}>
          July 2009
        </Figure>

        <HorizontalRule className={styles.divider} />

        <Figure
          src={img_2012_09}
          href="https://focused-knuth-7bc10d.netlify.app/"
          alt="September 2012"
          className={styles.screenshot}
        >
          <Link href="https://focused-knuth-7bc10d.netlify.app/">September 2012</Link> (
          <Link href="https://github.com/jakejarvis/jarv.is/tree/v1">view source</Link>)
        </Figure>

        <HorizontalRule className={styles.divider} />

        <Figure
          src={img_2018_04}
          href="https://hungry-mayer-40e790.netlify.app/"
          alt="April 2018"
          className={styles.screenshot}
        >
          <Link href="https://hungry-mayer-40e790.netlify.app/">April 2018</Link> (
          <Link href="https://github.com/jakejarvis/jarv.is/tree/v2">view source</Link>)
        </Figure>

        <HorizontalRule className={styles.divider} />

        <Figure
          src={img_2020_03}
          href="https://quiet-truffle-92842d.netlify.app/"
          alt="March 2020"
          className={styles.screenshot}
        >
          <Link href="https://quiet-truffle-92842d.netlify.app/">March 2020</Link> (
          <Link href="https://github.com/jakejarvis/jarv.is-hugo">view source</Link>)
        </Figure>
      </Content>
    </>
  );
}
