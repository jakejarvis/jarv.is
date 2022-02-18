import { Html, Head, Main, NextScript } from "next/document";
import * as config from "../lib/config";

// https://nextjs.org/docs/advanced-features/custom-document
const Document = () => {
  return (
    <Html lang={config.siteLocale?.replace("_", "-")}>
      <Head>
        {/* kinda a hack to prevent dramatically fading into dark theme if we're immediately setting it on load. */}
        {/* removed by `<Layout />` once the page is completely finished loading. */}
        <style id="block-transitions">{`*,::before,::after{transition:none!important}`}</style>
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
};

export default Document;
