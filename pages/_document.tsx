import { Html, Head, Main, NextScript } from "next/document";
import ThemeScript from "../components/ThemeScript/ThemeScript";
import { getCssText, themeClassNames, themeStorageKey, preloadFonts } from "../lib/styles/stitches.config";
import * as config from "../lib/config";

// https://nextjs.org/docs/advanced-features/custom-document
const Document = () => {
  return (
    <Html lang={config.siteLocale} className={themeClassNames["light"]}>
      <Head>
        {/* inject a small script to set/restore the user's theme ASAP */}
        <ThemeScript {...{ themeClassNames, themeStorageKey }} />

        {/* preload highest priority fonts defined in ../lib/styles/fonts/ */}
        {preloadFonts.map((font) => (
          <link
            key={`font-${font.key}`}
            rel="preload"
            as="font"
            type={font.type}
            href={font.src}
            crossOrigin="anonymous"
          />
        ))}

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
