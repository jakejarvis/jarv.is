import Document, { Html, Head, Main, NextScript } from "next/document";
import * as config from "../lib/config";

import type { DocumentContext } from "next/document";

class MyDocument extends Document {
  static async getInitialProps(ctx: DocumentContext) {
    const initialProps = await Document.getInitialProps(ctx);
    return { ...initialProps };
  }

  render() {
    return (
      <Html lang={config.siteLocale?.replace("_", "-")}>
        <Head>
          {/* set dynamically by script in _app.tsx, but tag must exist first */}
          <meta name="theme-color" content="" />
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

export default MyDocument;
