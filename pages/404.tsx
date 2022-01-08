import { NextSeo } from "next-seo";
import Image from "next/image";
import Link from "next/link";

import angryPandaGif from "../public/static/images/angry-panda.gif";

const Custom404 = () => (
  <>
    <NextSeo title="Page Not Found" noindex={true} nofollow={true} />

    <div>
      <Image src={angryPandaGif} width="435" height="300" alt="Panda takes out anger on innocent computer." />

      <h2>404s Make Panda Angry</h2>

      <Link href="/">
        <a>Maybe it's wise to get out of here and go home...?</a>
      </Link>
    </div>

    <style jsx>{`
      div {
        padding: 2em 0;
        text-align: center;
        line-height: 1.5;
      }
    `}</style>
  </>
);

export default Custom404;
