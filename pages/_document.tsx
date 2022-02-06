import Document, { Html, Head, Main, NextScript } from "next/document";
import classNames from "classnames";
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
        <Head />
        <body className={classNames("page", "no-fade")}>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

export default MyDocument;
