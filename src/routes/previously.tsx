import { createFileRoute } from "@tanstack/react-router";

import img2002_02 from "@/app/previously/images/2002_02.png";
import img2002_10 from "@/app/previously/images/2002_10.png";
import img2003_08 from "@/app/previously/images/2003_08.png";
import img2004_11 from "@/app/previously/images/2004_11.png";
import img2006_04 from "@/app/previously/images/2006_04.png";
import img2006_05 from "@/app/previously/images/2006_05.png";
import img2007_01 from "@/app/previously/images/2007_01.png";
import img2007_04 from "@/app/previously/images/2007_04.png";
import img2007_05 from "@/app/previously/images/2007_05.png";
import img2009_07 from "@/app/previously/images/2009_07.png";
import img2012_09 from "@/app/previously/images/2012_09.png";
import img2018_04 from "@/app/previously/images/2018_04.png";
import img2020_03 from "@/app/previously/images/2020_03.png";
import waybackImg from "@/app/previously/images/wayback.png";
import { PageStyles } from "@/app/previously/page-styles";
import { Win95Icon } from "@/components/icons";
import { PageTitle } from "@/components/layout/page-title";
import { Marquee } from "@/components/marquee";
import { createHead } from "@/lib/head";

export const Route = createFileRoute("/previously")({
  head: () =>
    createHead({
      title: "Previously on...",
      description:
        "An incredibly embarrassing and somewhat painful trip down this site's memory lane...",
      canonical: "/previously",
    }),
  component: PreviouslyPage,
});

const WarningMarquee = () => (
  <Marquee>
    <span className="leading-none">
      🚨 Trigger warning: excessive marquees, animated GIFs, Comic Sans, popups,{" "}
      <code className="text-[0.9rem] font-normal">
        color: <span className="text-[#32cd32]">limegreen</span>
      </code>{" "}
      ahead...
    </span>
  </Marquee>
);

function PreviouslyPage() {
  return (
    <>
      <PageStyles />

      <div className="prose prose-neutral dark:prose-invert prose-sm max-w-none">
        <PageTitle canonical="/previously" className="font-semibold">
          Previously
        </PageTitle>

        <img src={waybackImg} alt="Timeline of this website's past." />
        <em>
          Previously on the{" "}
          <a href="https://web.archive.org/web/20010501000000*/jakejarvis.com">
            Cringey Chronicles&trade;
          </a>{" "}
          of this website&rsquo;s past...
        </em>

        <hr />

        <WarningMarquee />

        <p>
          <a href="https://y2k.pages.dev">
            <Win95Icon className="inline size-4 align-text-top" /> Click here for the <em>full</em>{" "}
            experience (at your own risk).
          </a>
        </p>

        <iframe
          src="https://jakejarvis.github.io/my-first-website/"
          title="My Terrible, Horrible, No Good, Very Bad First Website"
          className="border-ring h-[500px] w-full border-2"
        />
        <em>
          <a href="https://jakejarvis.github.io/my-first-website/">November 2001</a> (
          <a href="https://github.com/jakejarvis/my-first-website">view source</a>)
        </em>

        <hr />

        <img src={img2002_02} alt="February 2002" />
        <em>February 2002</em>

        <hr />

        <img src={img2002_10} alt="October 2002" />
        <em>October 2002</em>

        <hr />

        <img src={img2003_08} alt="August 2003" />
        <em>August 2003</em>

        <hr />

        <img src={img2004_11} alt="November 2004" />
        <em>November 2004</em>

        <hr />

        <img src={img2006_04} alt="April 2006" />
        <em>April 2006</em>

        <hr />

        <img src={img2006_05} alt="May 2006" />
        <em>May 2006</em>

        <hr />

        <img src={img2007_01} alt="January 2007" />
        <em>January 2007</em>

        <hr />

        <img src={img2007_04} alt="April 2007" />
        <em>April 2007</em>

        <hr />

        <img src={img2007_05} alt="May 2007" />
        <em>May 2007</em>

        <hr />

        <img src={img2009_07} alt="July 2009" />
        <em>July 2009</em>

        <hr />

        <img src={img2012_09} alt="September 2012" />
        <em>
          <a href="https://focused-knuth-7bc10d.netlify.app/">September 2012</a> (
          <a href="https://github.com/jakejarvis/jarv.is/tree/v1">view source</a>)
        </em>

        <hr />

        <img src={img2018_04} alt="April 2018" />
        <em>
          <a href="https://hungry-mayer-40e790.netlify.app/">April 2018</a> (
          <a href="https://github.com/jakejarvis/jarv.is/tree/v2">view source</a>)
        </em>

        <hr />

        <img src={img2020_03} alt="March 2020" />
        <em>
          <a href="https://quiet-truffle-92842d.netlify.app/">March 2020</a> (
          <a href="https://github.com/jakejarvis/jarv.is-hugo">view source</a>)
        </em>
      </div>
    </>
  );
}
