import type { DefaultSeoProps, SocialProfileJsonLdProps, ArticleJsonLdProps } from "next-seo";

import * as config from ".";
import { meJpg, faviconPng, faviconIco, appleTouchIconPng } from "./favicons";

// Most of this file simply takes the data already defined in ./config.js and translates it into objects that are
// compatible with next-seo's props:
// https://github.com/garmeeh/next-seo#default-seo-configuration
export const defaultSeo: DefaultSeoProps = {
  defaultTitle: `${config.siteName} – ${config.shortDescription}`,
  titleTemplate: `%s – ${config.siteName}`, // appends `– siteName` to title provided by each page (except home)
  description: config.longDescription,
  openGraph: {
    siteName: config.siteName,
    title: `${config.siteName} – ${config.shortDescription}`,
    locale: config.siteLocale?.replace("-", "_"),
    type: "website",
    images: [
      {
        url: `${config.baseUrl}${meJpg.src}`,
        alt: `${config.siteName} – ${config.shortDescription}`,
      },
    ],
  },
  twitter: {
    handle: `@${config.authorSocial?.twitter}`,
    site: `@${config.authorSocial?.twitter}`,
    cardType: "summary",
  },
  additionalMetaTags: [
    {
      name: "viewport",
      content: "width=device-width, initial-scale=1",
    },
    {
      name: "author",
      content: config.authorName,
    },
    {
      name: "google-site-verification",
      content: config.verifyGoogle,
    },
    {
      name: "msvalidate.01",
      content: config.verifyBing,
    },
  ],
  additionalLinkTags: [
    {
      rel: "icon",
      href: faviconIco.src,
    },
    {
      rel: "icon",
      href: faviconPng.src,
      type: "image/png",
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
      href: "/feed.xml",
      type: "application/rss+xml",
      // @ts-ignore
      title: `${config.siteName} (RSS)`,
    },
    {
      rel: "alternate",
      href: "/feed.atom",
      type: "application/atom+xml",
      // @ts-ignore
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
      href: "/humans.txt",
    },
    {
      rel: "pgpkey",
      href: "/pubkey.asc",
      type: "application/pgp-keys",
    },
  ],
};

// https://github.com/garmeeh/next-seo#social-profile
export const socialProfileJsonLd: SocialProfileJsonLdProps = {
  type: "Person",
  name: config.authorName,
  url: `${config.baseUrl}/`,
  sameAs: [
    `${config.baseUrl}/`,
    `https://github.com/${config.authorSocial?.github}`,
    `https://keybase.io/${config.authorSocial?.keybase}`,
    `https://twitter.com/${config.authorSocial?.twitter}`,
    `https://medium.com/@${config.authorSocial?.medium}`,
    `https://www.linkedin.com/in/${config.authorSocial?.linkedin}/`,
    `https://www.facebook.com/${config.authorSocial?.facebook}`,
    `https://www.instagram.com/${config.authorSocial?.instagram}/`,
    `https://${config.authorSocial?.mastodon}/`,
  ],
};

// Just the basic items applicable to all notes, extended by pages/notes/[slug].tsx
// https://github.com/garmeeh/next-seo#article-1
export const articleJsonLd: Pick<ArticleJsonLdProps, "authorName" | "publisherName" | "publisherLogo"> = {
  authorName: [config.authorName],
  publisherName: config.siteName,
  publisherLogo: `${config.baseUrl}${meJpg.src}`,
};
