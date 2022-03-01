import { Html, Head, Main, NextScript } from "next/document";
import themes, { toCSS } from "../lib/config/themes";
import * as config from "../lib/config";

// https://nextjs.org/docs/advanced-features/custom-document
const Document = () => {
  return (
    <Html lang={config.siteLocale?.replace("_", "-")}>
      <Head>
        {/* convert themes object into inlined css variables */}
        <style
          id="theme-colors"
          dangerouslySetInnerHTML={{
            __html: `:root{${toCSS(themes.light)}}[data-theme="dark"]{${toCSS(themes.dark)}}`,
          }}
        />
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
};

export default Document;
