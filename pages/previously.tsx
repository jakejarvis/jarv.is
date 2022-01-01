/* eslint-disable camelcase */

import Image from "next/image";
import Layout from "../components/Layout";
import Container from "../components/Container";
import Content from "../components/Content";
import PageTitle from "../components/page/PageTitle";
import { FloppyIcon, SirenIcon } from "../components/icons";

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

export default function Previously() {
  return (
    <>
      <Layout>
        <Container
          title="Previously on..."
          description="An incredibly embarrassing and somewhat painful down of this site's memory lane..."
        >
          <PageTitle
            title={
              <>
                <FloppyIcon /> Previously on...
              </>
            }
          />
          <Content>
            <figure>
              <a
                className="no-underline"
                href="https://web.archive.org/web/20010501000000*/jakejarvis.com"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Image src={img_wayback} placeholder="blur" alt="Timeline of this website's past." />
              </a>
              <figcaption>
                ...the{" "}
                <a
                  href="https://web.archive.org/web/20010501000000*/jakejarvis.com"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Cringey Chronicles&trade;
                </a>{" "}
                of this website's past.
              </figcaption>
            </figure>

            <hr />

            <p>
              <SirenIcon /> <strong>Trigger warning:</strong> marquees, Comic Sans MS, popups,{" "}
              <code>
                color: <span className="limegreen">limegreen</span>
              </code>
              ...{" "}
              <a href="https://y2k.app/" target="_blank" rel="noopener noreferrer">
                Click for the{" "}
                <strong>
                  <em>FULL</em>
                </strong>{" "}
                experience anyway.
              </a>
            </p>
            <figure>
              <iframe
                className="y2k_frame"
                src="https://jakejarvis.github.io/my-first-website/"
                title="My Terrible, Horrible, No Good, Very Bad First Website"
              ></iframe>
              <figcaption>
                November 2001 (
                <a href="https://github.com/jakejarvis/my-first-website" target="_blank" rel="noopener noreferrer">
                  archived source
                </a>
                )
              </figcaption>
            </figure>

            <hr />

            <figure>
              <Image src={img_2002_02} placeholder="blur" alt="February 2002" />
              <figcaption>February 2002</figcaption>
            </figure>

            <hr />

            <figure>
              <Image src={img_2002_10} placeholder="blur" alt="October 2002" />
              <figcaption>October 2002</figcaption>
            </figure>

            <hr />

            <figure>
              <Image src={img_2003_08} placeholder="blur" alt="August 2003" />
              <figcaption>August 2003</figcaption>
            </figure>

            <hr />

            <figure>
              <Image src={img_2004_11} placeholder="blur" alt="November 2004" />
              <figcaption>November 2004</figcaption>
            </figure>

            <hr />

            <figure>
              <Image src={img_2006_04} placeholder="blur" alt="April 2006" />
              <figcaption>April 2006</figcaption>
            </figure>

            <hr />

            <figure>
              <Image src={img_2006_05} placeholder="blur" alt="May 2006" />
              <figcaption>May 2006</figcaption>
            </figure>

            <hr />

            <figure>
              <Image src={img_2007_01} placeholder="blur" alt="January 2007" />
              <figcaption>January 2007</figcaption>
            </figure>

            <hr />

            <figure>
              <Image src={img_2007_04} placeholder="blur" alt="April 2007" />
              <figcaption>April 2007</figcaption>
            </figure>

            <hr />

            <figure>
              <Image src={img_2007_05} placeholder="blur" alt="May 2007" />
              <figcaption>May 2007</figcaption>
            </figure>

            <hr />

            <figure>
              <Image src={img_2009_07} placeholder="blur" alt="July 2009" />
              <figcaption>July 2009</figcaption>
            </figure>

            <hr />

            <figure>
              <a
                className="no-underline"
                href="https://github.com/jakejarvis/jarv.is/tree/v1"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Image src={img_2012_09} placeholder="blur" alt="September 2012" />
              </a>
              <figcaption>
                September 2012 (
                <a href="https://github.com/jakejarvis/jarv.is/tree/v1" target="_blank" rel="noopener noreferrer">
                  archived source
                </a>
                )
              </figcaption>
            </figure>

            <hr />

            <figure>
              <a
                className="no-underline"
                href="https://github.com/jakejarvis/jarv.is/tree/v2"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Image src={img_2018_04} placeholder="blur" alt="April 2018" />
              </a>
              <figcaption>
                April 2018 (
                <a href="https://github.com/jakejarvis/jarv.is/tree/v2" target="_blank" rel="noopener noreferrer">
                  archived source
                </a>
                )
              </figcaption>
            </figure>
          </Content>
        </Container>
      </Layout>
      <style jsx global>{`
        body {
          font-family: "Comic Neue", "Comic Sans MS", "Comic Sans", "Inter", sans-serif;
          font-weight: 600 !important;
        }
        header nav a span {
          font-size: 1.1em !important;
          font-weight: 700 !important;
        }
        header nav > a span:nth-of-type(2) {
          font-size: 1.4em !important;
          font-weight: 700 !important;
        }
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
        footer > div {
          font-size: 0.95em !important;
        }
        .y2k_frame {
          width: 100%;
          height: 500px;
          border: 2px solid #e3d18c;
        }
        .limegreen {
          color: #32cd32;
        }
      `}</style>
    </>
  );
}
