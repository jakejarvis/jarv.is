import { env } from "../env";
import * as config from "../config";
import type { Metadata } from "next";

export const defaultMetadata: Metadata = {
  metadataBase: env.NEXT_PUBLIC_BASE_URL ? new URL(env.NEXT_PUBLIC_BASE_URL) : undefined,
  title: {
    template: `%s – ${config.siteName}`,
    default: `${config.siteName} – ${config.tagline}`,
  },
  description: config.description,
  openGraph: {
    siteName: config.siteName,
    title: {
      template: "%s",
      default: `${config.siteName} – ${config.tagline}`,
    },
    url: "/",
    locale: env.NEXT_PUBLIC_SITE_LOCALE.replace("-", "_"),
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

/**
 * Helper function to deep merge a page's metadata into the default site metadata
 * @see https://nextjs.org/docs/app/api-reference/functions/generate-metadata
 */
export const addMetadata = (metadata: Metadata): Metadata => {
  return {
    ...defaultMetadata,
    ...metadata,
    openGraph: {
      ...defaultMetadata.openGraph,
      title: metadata.title as string,
      description: metadata.description as string,
      url: metadata.alternates?.canonical as string,
      ...metadata.openGraph,
    },
    twitter: {
      ...defaultMetadata.twitter,
      ...metadata.twitter,
    },
    alternates: {
      ...defaultMetadata.alternates,
      ...metadata.alternates,
    },
    other: {
      ...defaultMetadata.other,
      ...metadata.other,
    },
  };
};
