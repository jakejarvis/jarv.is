import { Html, Head, Main, NextScript } from "next/document";
import { getCssText, preloadUrls } from "../lib/styles/stitches.config";
import * as config from "../lib/config";

// https://nextjs.org/docs/advanced-features/custom-document
const Document = () => {
  return (
    <Html lang={config.siteLocale?.replace("_", "-")}>
      <Head>
        {/* static asset preloads */}
        <link rel="preload" as="font" type="font/woff2" href={preloadUrls.fonts.InterVar} crossOrigin="anonymous" />
        <link
          rel="preload"
          as="font"
          type="font/woff2"
          href={preloadUrls.fonts.RobotoMonoVar}
          crossOrigin="anonymous"
        />

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
