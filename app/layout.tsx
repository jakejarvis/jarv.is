import clsx from "clsx";
import { JsonLd } from "react-schemaorg";
import Analytics from "./analytics";
import { ThemeProvider, ThemeScript } from "../contexts/ThemeContext";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { SkipToContentLink, SkipToContentTarget } from "../components/SkipToContent";
import * as config from "../lib/config";
import { BASE_URL, MAX_WIDTH } from "../lib/config/constants";
import defaultMetadata from "../lib/config/metadata";
import type { Metadata } from "next";
import type { Person, WebSite } from "schema-dts";

import { GeistMono, GeistSans } from "../lib/styles/fonts";
import "modern-normalize/modern-normalize.css"; // https://github.com/sindresorhus/modern-normalize/blob/main/modern-normalize.css
import "./themes.css";
import "./global.css";

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
            image: `${BASE_URL}${ogImage.src}`,
            sameAs: [
              BASE_URL,
              `https://github.com/${config.authorSocial?.github}`,
              `https://keybase.io/${config.authorSocial?.keybase}`,
              `https://twitter.com/${config.authorSocial?.twitter}`,
              `https://medium.com/@${config.authorSocial?.medium}`,
              `https://www.linkedin.com/in/${config.authorSocial?.linkedin}/`,
              `https://www.facebook.com/${config.authorSocial?.facebook}`,
              `https://www.instagram.com/${config.authorSocial?.instagram}/`,
              `https://${config.authorSocial?.mastodon}`,
              `https://bsky.app/profile/${config.authorSocial?.bluesky}`,
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

      <body
        className={clsx(GeistMono.variable, GeistSans.variable)}
        style={{ ["--max-width" as string]: `${MAX_WIDTH}px` }}
      >
        <ThemeProvider>
          <SkipToContentLink />

          <div className={styles.flex}>
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
