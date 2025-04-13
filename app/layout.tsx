import { JsonLd } from "react-schemaorg";
import { Analytics } from "@vercel/analytics/next";
import clsx from "clsx";
import { ThemeProvider, ThemeScript } from "../contexts/ThemeContext";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { SkipNavLink, SkipNavTarget } from "../components/SkipNav";
import { defaultMetadata } from "../lib/helpers/metadata";
import * as config from "../lib/config";
import { BASE_URL, MAX_WIDTH, SITE_LOCALE } from "../lib/config/constants";
import type { Metadata } from "next";
import type { Person, WebSite } from "schema-dts";

import { GeistMono, GeistSans } from "./fonts";
import "./global.css";
import "./themes.css";

import styles from "./layout.module.css";

export const metadata: Metadata = defaultMetadata;

const RootLayout = ({ children }: Readonly<{ children: React.ReactNode }>) => {
  return (
    <html lang={SITE_LOCALE || "en-US"} suppressHydrationWarning>
      <head>
        <ThemeScript />

        <JsonLd<Person>
          item={{
            "@context": "https://schema.org",
            "@type": "Person",
            "@id": `${BASE_URL}/#person`,
            name: config.authorName,
            url: BASE_URL,
            image: [`${BASE_URL}/opengraph-image.jpg`],
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
            description: config.description,
            inLanguage: SITE_LOCALE,
            license: config.licenseUrl,
          }}
        />
      </head>

      <body
        className={clsx(GeistSans.variable, GeistMono.variable)}
        style={{ ["--max-width" as string]: `${MAX_WIDTH}px` }}
      >
        <ThemeProvider>
          <SkipNavLink />

          <div className={styles.layout}>
            <Header />

            <main className={styles.default}>
              <div className={styles.container}>
                <SkipNavTarget />
                {children}
              </div>
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
