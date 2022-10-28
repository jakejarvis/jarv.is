import { Html, Head, Main, NextScript } from "next/document";
import ThemeScript from "../components/ThemeScript";
import { getCssText, themeClassNames, themeStorageKey } from "../lib/styles/stitches.config";
import * as config from "../lib/config";

// https://nextjs.org/docs/advanced-features/custom-document
const Document = () => {
  return (
    <Html lang={config.siteLocale} className={themeClassNames["light"]}>
      <Head>
        {/* inject a small script to set/restore the user's theme ASAP */}
        <ThemeScript id="restore-theme" {...{ themeClassNames, themeStorageKey }} />

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
