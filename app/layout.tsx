import clsx from "clsx";
import { Analytics } from "@vercel/analytics/react";
import { ThemeProvider } from "../contexts/ThemeContext";
import Layout from "../components/Layout";
import config from "../lib/config";
import type { Metadata } from "next";
import type { Person, WithContext } from "schema-dts";

import { GeistMono, GeistSans } from "../lib/styles/fonts";
import "modern-normalize/modern-normalize.css"; // https://github.com/sindresorhus/modern-normalize/blob/main/modern-normalize.css
import "./themes.css";
import "./global.css";

import { meJpg } from "../lib/config/favicons";

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_BASE_URL || `https://${config.siteDomain}`),
  title: {
    template: `%s – ${config.siteName}`,
    default: `${config.siteName} – ${config.shortDescription}`,
  },
  description: config.longDescription,
  openGraph: {
    siteName: config.siteName,
    title: {
      template: `%s – ${config.siteName}`,
      default: `${config.siteName} – ${config.shortDescription}`,
    },
    url: "/",
    locale: config.siteLocale?.replace("-", "_"),
    type: "website",
    images: [
      {
        url: meJpg.src,
        alt: `${config.siteName} – ${config.shortDescription}`,
      },
    ],
  },
  alternates: {
    types: {
      "application/rss+xml": "/feed.xml",
      "application/atom+xml": "/feed.atom",
    },
    canonical: "/",
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
  url: metadata.metadataBase?.href || `https://${config.siteDomain}/`,
  image: new URL(meJpg.src, metadata.metadataBase || `https://${config.siteDomain}`).href,
  sameAs: [
    metadata.metadataBase?.href || `https://${config.siteDomain}/`,
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

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang={config.siteLocale} suppressHydrationWarning>
      <head>
        <script
          // unminified: https://gist.github.com/jakejarvis/79b0ec8506bc843023546d0d29861bf0
          dangerouslySetInnerHTML={{
            __html: `(()=>{try{const e=document.documentElement,t="undefined"!=typeof Storage?window.localStorage.getItem("theme"):null,a=(t&&"dark"===t)??window.matchMedia("(prefers-color-scheme: dark)").matches?"dark":"light";e.dataset.theme=a,e.style.colorScheme=a}catch(e){}})()`,
          }}
        />

        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      </head>

      <body className={clsx(GeistMono.variable, GeistSans.variable)}>
        <ThemeProvider>
          <Layout>{children}</Layout>
        </ThemeProvider>

        <Analytics />
      </body>
    </html>
  );
}
