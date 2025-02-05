import clsx from "clsx";
import { Analytics } from "@vercel/analytics/react";
import { ThemeProvider } from "../contexts/ThemeContext";
import Layout from "../components/Layout";
import config from "../lib/config";
import type { Metadata } from "next";

import { GeistMono, GeistSans } from "../lib/styles/fonts";
import { meJpg } from "../lib/config/favicons";

import "modern-normalize/modern-normalize.css";
import "../lib/styles/theme.css";
import "../lib/styles/global.css";

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
  verification: {
    google: config.verifyGoogle,
  },
  other: {
    humans: "/humans.txt",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang={config.siteLocale} className={clsx(GeistMono.variable, GeistSans.variable)} suppressHydrationWarning>
      <head>
        <script
          // unminified: https://gist.github.com/jakejarvis/79b0ec8506bc843023546d0d29861bf0
          dangerouslySetInnerHTML={{
            __html: `(()=>{try{const e=document.documentElement,t="undefined"!=typeof Storage?window.localStorage.getItem("theme"):null,a=(t&&"dark"===t)??window.matchMedia("(prefers-color-scheme: dark)").matches?"dark":"light";e.dataset.theme=a,e.style.colorScheme=a}catch(e){}})()`,
          }}
        />
      </head>
      <body>
        <ThemeProvider>
          <Layout>{children}</Layout>
        </ThemeProvider>

        <Analytics />
      </body>
    </html>
  );
}
