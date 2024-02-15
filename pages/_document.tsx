import { Html, Head, Main, NextScript } from "next/document";
import { getCssText, theme } from "../lib/styles/stitches.config";
import * as config from "../lib/config";

// https://nextjs.org/docs/advanced-features/custom-document
const Document = () => {
  return (
    <Html lang={config.siteLocale} className={theme.className}>
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
