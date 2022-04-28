import { Html, Head, Main, NextScript } from "next/document";
import ThemeScript from "../components/ThemeScript/ThemeScript";
import { getCssText } from "../lib/styles/stitches.config";
import * as config from "../lib/config";

// https://nextjs.org/docs/advanced-features/custom-document
const Document = () => {
  return (
    <Html lang={config.siteLocale}>
      <Head>
        {/* inject a small script to set/restore the user's theme ASAP */}
        <ThemeScript />

        {/* stitches SSR: https://stitches.dev/blog/using-nextjs-with-stitches#step-3-ssr */}
        <style id="stitches" dangerouslySetInnerHTML={{ __html: getCssText() }} />
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
};

export default Document;
