import clsx from "clsx";
import Analytics from "./analytics";
import { ThemeProvider } from "../contexts/ThemeContext";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { SkipToContentLink, SkipToContentTarget } from "../components/SkipToContent";
import * as config from "../lib/config";
import { BASE_URL, MAX_WIDTH } from "../lib/config/constants";
import type { Metadata } from "next";
import type { Person, WithContext } from "schema-dts";

import { GeistMono, GeistSans } from "../lib/styles/fonts";
import "modern-normalize/modern-normalize.css"; // https://github.com/sindresorhus/modern-normalize/blob/main/modern-normalize.css
import "./themes.css";
import "./global.css";

import styles from "./layout.module.css";

import ogImage from "./opengraph-image.jpg";

export const metadata: Metadata = {
  metadataBase: new URL(BASE_URL),
  title: {
    template: `%s – ${config.siteName}`,
    default: `${config.siteName} – ${config.shortDescription}`,
  },
  description: config.longDescription,
  openGraph: {
    siteName: config.siteName,
    title: {
      template: "%s",
      default: `${config.siteName} – ${config.shortDescription}`,
    },
    url: "/",
    locale: config.siteLocale?.replace("-", "_"),
    type: "website",
  },
  twitter: {
    creator: `@${config.authorSocial?.twitter}`,
  },
  alternates: {
    canonical: "/",
    types: {
      "application/rss+xml": [
        {
          title: `${config.siteName} (RSS)`,
          url: "/feed.xml",
        },
      ],
      "application/atom+xml": [
        {
          title: `${config.siteName} (Atom)`,
          url: "/feed.atom",
        },
      ],
    },
  },
  other: {
    humans: "/humans.txt",
  },
};

// https://nextjs.org/docs/app/building-your-application/optimizing/metadata#json-ld
const jsonLd: WithContext<Person> = {
  "@context": "https://schema.org",
  "@type": "Person",
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
};

const RootLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <html lang={config.siteLocale} suppressHydrationWarning>
      <head>
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      </head>

      <body className={clsx(GeistMono.variable, GeistSans.variable)}>
        <ThemeProvider>
          <SkipToContentLink />

          <div className={styles.flex}>
            <Header />

            <main className={styles.default}>
              <SkipToContentTarget />
              <div className={styles.container} style={{ maxWidth: MAX_WIDTH }}>
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
