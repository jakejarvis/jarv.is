import { Html, Head, Main, NextScript } from "next/document";
import { getCssText } from "../lib/styles/stitches.config";
import * as config from "../lib/config";

// https://nextjs.org/docs/advanced-features/custom-document
// https://stitches.dev/blog/using-nextjs-with-stitches#step-3-ssr
const Document = () => {
  return (
    <Html lang={config.siteLocale?.replace("_", "-")}>
      <Head>
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
