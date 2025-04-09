import { JsonLd } from "react-schemaorg";
import Analytics from "./analytics";
import { ThemeProvider, ThemeScript } from "../contexts/ThemeContext";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { SkipToContentLink, SkipToContentTarget } from "../components/SkipToContent";
import { setRootCssVariables } from "../lib/helpers/styles";
import * as config from "../lib/config";
import { BASE_URL, MAX_WIDTH } from "../lib/config/constants";
import defaultMetadata from "../lib/config/seo";
import type { Metadata } from "next";
import type { Person, WebSite } from "schema-dts";

import { GeistMono, GeistSans } from "./fonts";
import "./global.css";
import "./themes.css";

import styles from "./layout.module.css";

import ogImage from "./opengraph-image.jpg";

export const metadata: Metadata = defaultMetadata;

const RootLayout = ({ children }: Readonly<{ children: React.ReactNode }>) => {
  return (
    <html lang={config.siteLocale} suppressHydrationWarning>
      <head>
        <ThemeScript />

        <JsonLd<Person>
          item={{
            "@context": "https://schema.org",
            "@type": "Person",
            "@id": `${BASE_URL}/#person`,
            name: config.authorName,
            url: BASE_URL,
            image: {
              "@type": "ImageObject",
              contentUrl: `${BASE_URL}${ogImage.src}`,
              width: `${ogImage.width}`,
              height: `${ogImage.height}`,
            },
            sameAs: [
              `${BASE_URL}`,
              `https://${config.authorSocial?.mastodon}`,
              `https://github.com/${config.authorSocial?.github}`,
              `https://bsky.app/profile/${config.authorSocial?.bluesky}`,
              `https://twitter.com/${config.authorSocial?.twitter}`,
              `https://medium.com/@${config.authorSocial?.medium}`,
              `https://www.linkedin.com/in/${config.authorSocial?.linkedin}/`,
              `https://www.facebook.com/${config.authorSocial?.facebook}`,
              `https://www.instagram.com/${config.authorSocial?.instagram}/`,
            ],
          }}
        />

        <JsonLd<WebSite>
          item={{
            "@context": "https://schema.org",
            "@type": "WebSite",
            "@id": `${BASE_URL}/#website`,
            name: config.siteName,
            url: BASE_URL,
            author: config.authorName,
            description: config.longDescription,
            inLanguage: config.siteLocale,
            license: config.licenseUrl,
          }}
        />
      </head>

      <body className={styles.body}>
        <style
          precedence={styles.layout}
          {...setRootCssVariables({
            "fonts-sans": GeistSans.style.fontFamily,
            "fonts-mono": GeistMono.style.fontFamily,
            "max-width": `${MAX_WIDTH}px`,
          })}
        />

        <ThemeProvider>
          <SkipToContentLink />

          <div className={styles.layout}>
            <Header />

            <main className={styles.default}>
              <SkipToContentTarget />
              <div className={styles.container}>{children}</div>
            </main>

            <Footer />
          </div>
        </ThemeProvider>

        <Analytics />
      </body>
    </html>
  );
};

export default RootLayout;
