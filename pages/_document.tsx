import { Html, Head, Main, NextScript } from "next/document";
import ThemeScript from "../components/ThemeScript";
import { getCssText, themeClassNames, themeStorageKey } from "../lib/styles/stitches.config";
import * as config from "../lib/config";

// https://nextjs.org/docs/advanced-features/custom-document
const Document = () => {
  return (
    <Html lang={config.siteLocale} className={themeClassNames["light"]}>
      <Head>
        {/* inject this script (generated at build-time) to prioritize setting/restoring the user's theme. */}
        <ThemeScript key="restore-theme-js" {...{ themeClassNames, themeStorageKey }} />

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
