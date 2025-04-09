import * as config from ".";
import { BASE_URL } from "./constants";
import type { Metadata } from "next";

const defaultMetadata: Metadata = {
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

export default defaultMetadata;
