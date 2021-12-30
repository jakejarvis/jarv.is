// @ts-nocheck
// ^ type checking causes a bunch of issues in DefaultSeo, BE CAREFUL

import Script from "next/script";
import type { AppProps } from "next/app";
import { DefaultSeo, SocialProfileJsonLd } from "next-seo";
import * as config from "../lib/config";

import meJpg from "../public/static/images/me.jpg";
import faviconIco from "../public/static/images/favicon.ico";
import appleTouchIconPng from "../public/static/images/apple-touch-icon.png";

import "../styles/index.scss";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <DefaultSeo
        defaultTitle={`${config.siteName} – ${config.shortDescription}`}
        titleTemplate={`%s – ${config.siteName}`}
        description={config.longDescription}
        canonical={`${config.baseURL}/`}
        openGraph={{
          site_name: config.siteName,
          title: `${config.siteName} – ${config.shortDescription}`,
          url: `${config.baseURL}/`,
          locale: "en_US",
          type: "website",
          images: [
            {
              url: `${config.baseURL}${meJpg.src}`,
              alt: `${config.siteName} – ${config.shortDescription}`,
            },
          ],
        }}
        twitter={{
          handle: `@${config.twitterHandle}`,
          site: `@${config.twitterHandle}`,
          cardType: "summary",
        }}
        facebook={{
          appId: config.facebookAppId,
        }}
        additionalLinkTags={[
          {
            rel: "icon",
            href: "data:image/svg+xml,%0A%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 64 64'%3E%3Cpath fill='%236fbc4e' d='m27.7 5 17.1 9.8 8.5-4.9-17-9.9z'/%3E%3Cpath fill='%23ffb900' d='m27.7 14.8 8.6 4.9v19.7l8.5 4.9V14.8L27.7 5zm-8.5 24.6-8.5-4.9v19.6l17 9.9v-9.8l-8.5-5z'/%3E%3Cpath fill='%23009cdf' d='M27.7 44.3v-9.8l-8.5 4.9v9.8zm17.1 0-17.1 9.9V64l25.6-14.7V9.9l-8.5 4.9z'/%3E%3Cpath fill='%236fbc4e' d='m10.7 34.5 8.5 4.9 8.5-4.9-8.5-4.9zm8.5 14.7 8.5 5 17.1-9.9-8.5-4.9z'/%3E%3C/svg%3E",
            type: "image/svg+xml",
          },
          {
            rel: "icon",
            href: faviconIco.src,
          },
          {
            rel: "apple-touch-icon",
            href: appleTouchIconPng.src,
            sizes: `${appleTouchIconPng.width}x${appleTouchIconPng.height}`,
          },
          {
            rel: "manifest",
            href: "/site.webmanifest",
          },
          {
            rel: "alternate",
            href: `/feed.xml`,
            type: "application/rss+xml",
            title: `${config.siteName} (RSS)`,
          },
          {
            rel: "alternate",
            href: `/feed.atom`,
            type: "application/atom+xml",
            title: `${config.siteName} (Atom)`,
          },
          {
            rel: "webmention",
            href: `https://webmention.io/${config.webmentionId}/webmention`,
          },
          {
            rel: "pingback",
            href: `https://webmention.io/${config.webmentionId}/xmlrpc`,
          },
          {
            rel: "humans",
            href: `/humans.txt`,
          },
          {
            rel: "pgpkey",
            href: `/pubkey.asc`,
            type: "application/pgp-keys",
          },
        ]}
        additionalMetaTags={[
          {
            name: "viewport",
            content: "width=device-width, initial-scale=1",
          },
          {
            name: "author",
            content: config.authorName,
          },
          {
            name: "monetization",
            content: config.monetization,
          },
          {
            name: "twitter:dnt",
            content: "on",
          },
          {
            name: "twitter:widgets:csp",
            content: "on",
          },
        ]}
      />
      <SocialProfileJsonLd
        type="Person"
        name="Jake Jarvis"
        url={`${config.baseURL}/`}
        sameAs={[
          `${config.baseURL}/`,
          "https://github.com/jakejarvis",
          "https://keybase.io/jakejarvis",
          "https://twitter.com/jakejarvis",
          "https://medium.com/@jakejarvis",
          "https://www.linkedin.com/in/jakejarvis/",
          "https://www.facebook.com/jakejarvis",
          "https://www.instagram.com/jakejarvis/",
          "https://mastodon.social/@jakejarvis",
        ]}
      />

      {/* Inline script to restore light/dark theme preference ASAP */}
      <Script id="restore_theme">{`
try {
  var pref = localStorage.getItem("dark_mode"),
      dark = pref === "true" || (!pref && window.matchMedia("(prefers-color-scheme: dark)").matches);
  document.documentElement.setAttribute("data-theme", dark ? "dark" : "light");
} catch (e) {}`}</Script>

      <Component {...pageProps} />
    </>
  );
}
