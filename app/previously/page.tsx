import PageTitle from "../../components/PageTitle";
import Link from "../../components/Link";
import Figure from "../../components/Figure";
import CodeInline from "../../components/CodeInline";
import HorizontalRule from "../../components/HorizontalRule";
import { metadata as defaultMetadata } from "../layout";
import type { Metadata } from "next";

import { ComicNeue } from "../../lib/styles/fonts";
import styles from "./page.module.css";

import img_wayback from "./images/wayback.png";
import img_2002_02 from "./images/2002_02.png";
import img_2002_10 from "./images/2002_10.png";
import img_2003_08 from "./images/2003_08.png";
import img_2004_11 from "./images/2004_11.png";
import img_2006_04 from "./images/2006_04.png";
import img_2006_05 from "./images/2006_05.png";
import img_2007_01 from "./images/2007_01.png";
import img_2007_04 from "./images/2007_04.png";
import img_2007_05 from "./images/2007_05.png";
import img_2009_07 from "./images/2009_07.png";
import img_2012_09 from "./images/2012_09.png";
import img_2018_04 from "./images/2018_04.png";
import img_2020_03 from "./images/2020_03.png";

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

const Page = () => {
  return (
    <div
      className={styles.wackyWrapper}
      style={{
        fontFamily: `${ComicNeue.style.fontFamily}, var(--fonts-sans)`,
      }}
    >
      <PageTitle canonical="/previously">Previously</PageTitle>

      <Figure src={img_wayback} alt="Timeline of this website's past." priority className={styles.screenshot}>
        ...the <Link href="https://web.archive.org/web/20010501000000*/jakejarvis.com">Cringey Chronicles&trade;</Link>{" "}
        of this website's past.
      </Figure>

      <HorizontalRule className={styles.divider} />

      <p style={{ textAlign: "center", margin: "0.5em 0" }}>
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

      <p style={{ textAlign: "center", fontSize: "0.95em", margin: "0.5em 0" }}>
        <Link href="/y2k">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="currentColor"
            stroke="currentColor"
            strokeWidth="0"
            viewBox="0 0 24 24"
            height="1.2em"
            width="1.2em"
            style={{
              display: "inline",
              width: "1.2em",
              height: "1.2em",
              verticalAlign: "-0.15em",
              marginRight: "0.1em",
            }}
          >
            <path d="M5.712 1.596l-.756.068-.238.55.734-.017zm1.39.927l-.978.137-.326.807.96-.12.345-.824zM4.89 3.535l-.72.05-.24.567.721-.017zm3.724.309l-1.287.068-.394.96 1.27-.052zm1.87.566l-1.579.069-.566 1.357 1.596-.088.548-1.338zm-4.188.037l-.977.153-.343.806.976-.12zm6.144.668l-1.87.135-.637 1.527 1.87-.154zm2.925.219c-.11 0-.222 0-.334.002l-.767 1.85c1.394-.03 2.52.089 3.373.38l-1.748 4.201c-.955-.304-2.082-.444-3.36-.394l-.54 1.305a8.762 8.762 0 0 1 3.365.396l-1.663 4.014c-1.257-.27-2.382-.395-3.387-.344l-.782 1.887c3.363-.446 6.348.822 9.009 3.773L24 9.23c-2.325-2.575-5.2-3.88-8.637-3.896zm-.644.002l-2.024.12-.687 1.68 2.025-.19zm-10.603.05l-.719.036-.224.566h.703l.24-.601zm3.69.397l-1.287.069-.395.959 1.27-.05zM5.54 6.3l-.994.154-.344.807.98-.121zm4.137.066l-1.58.069L7.53 7.77l1.596-.085.55-1.32zm1.955.688l-1.87.135-.636 1.527 1.887-.154zm2.282.19l-2.01.136-.7 1.682 2.04-.19.67-1.63zm-10.57.066l-.739.035-.238.564h.72l.257-.6zm3.705.293l-1.303.085-.394.96 1.287-.034zm11.839.255a6.718 6.718 0 0 1 2.777 1.717l-1.75 4.237c-.617-.584-1.15-.961-1.611-1.149l-1.201-.498zM4.733 8.22l-.976.154-.344.807.961-.12.36-.841zm4.186 0l-1.594.052-.549 1.354L8.37 9.54zm1.957.668L8.99 9.04l-.619 1.508 1.87-.135.636-1.527zm2.247.275l-2.007.12-.703 1.665 2.042-.156zM2.52 9.267l-.718.033-.24.549.718-.016zm3.725.273l-1.289.07-.41.96 1.287-.03.412-1zm1.87.6l-1.596.05-.55 1.356 1.598-.084.547-1.322zm-4.186.037l-.979.136-.324.805.96-.119zm6.14.633l-1.87.154-.653 1.527 1.906-.154zm2.267.275l-2.026.12-.686 1.663 2.025-.172zm-10.569.031l-.739.037-.238.565.72-.016zm3.673.362l-1.289.068-.41.978 1.305-.05zm-2.285.533l-.976.154-.326.805.96-.12.342-.84zm4.153.07l-1.596.066-.565 1.356 1.612-.084zm1.957.666l-1.889.154-.617 1.526 1.886-.15zm2.28.223l-2.025.12-.685 1.665 2.041-.172.67-1.613zm-10.584.05l-.738.053L0 13.64l.72-.02.24-.6zm3.705.31l-1.285.07-.395.976 1.287-.05.393-.997zm11.923.07c1.08.29 2.024.821 2.814 1.613l-1.715 4.183c-.892-.754-1.82-1.32-2.814-1.664l1.715-4.133zm-10.036.515L4.956 14l-.549 1.32 1.578-.066.567-1.338zm-4.184.014l-.996.156-.309.79.961-.106zm6.14.67l-1.904.154-.617 1.527 1.89-.154.632-1.527zm2.231.324l-2.025.123-.686 1.682 2.026-.174zm-6.863.328l-1.3.068-.397.98 1.285-.054zm1.871.584l-1.578.068-.566 1.334 1.595-.064zm1.953.701l-1.867.137-.635 1.51 1.87-.137zm2.23.31l-2.005.122-.703 1.68 2.04-.19.67-1.61z" />
          </svg>{" "}
          Click here for the <em>full</em> experience anyway.
        </Link>
      </p>

      <figure className={styles.screenshot}>
        <iframe
          src="https://jakejarvis.github.io/my-first-website/"
          title="My Terrible, Horrible, No Good, Very Bad First Website"
          className={styles.iframe}
          style={{ height: "500px" }}
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

      <Figure src={img_2012_09} alt="September 2012" className={styles.screenshot}>
        <Link href="https://focused-knuth-7bc10d.netlify.app/">September 2012</Link> (
        <Link href="https://github.com/jakejarvis/jarv.is/tree/v1">view source</Link>)
      </Figure>

      <HorizontalRule className={styles.divider} />

      <Figure src={img_2018_04} alt="April 2018" className={styles.screenshot}>
        <Link href="https://hungry-mayer-40e790.netlify.app/">April 2018</Link> (
        <Link href="https://github.com/jakejarvis/jarv.is/tree/v2">view source</Link>)
      </Figure>

      <HorizontalRule className={styles.divider} />

      <Figure src={img_2020_03} alt="March 2020" className={styles.screenshot}>
        <Link href="https://quiet-truffle-92842d.netlify.app/">March 2020</Link> (
        <Link href="https://github.com/jakejarvis/jarv.is-hugo">view source</Link>)
      </Figure>
    </div>
  );
};

export default Page;
