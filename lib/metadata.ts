import { env } from "@/lib/env";
import siteConfig from "@/lib/config/site";
import authorConfig from "@/lib/config/author";
import type { Metadata } from "next";

export const defaultMetadata: Metadata = {
  metadataBase: new URL(env.NEXT_PUBLIC_BASE_URL),
  title: {
    template: `%s – ${siteConfig.name}`,
    default: `${siteConfig.name} – ${siteConfig.tagline}`,
  },
  description: siteConfig.description,
  openGraph: {
    siteName: siteConfig.name,
    title: {
      template: "%s",
      default: `${siteConfig.name} – ${siteConfig.tagline}`,
    },
    url: "/",
    locale: env.NEXT_PUBLIC_SITE_LOCALE.replace("-", "_"),
    type: "website",
  },
  twitter: {
    creator: `@${authorConfig.social?.twitter}`,
  },
  alternates: {
    canonical: "/",
    types: {
      "application/rss+xml": [
        {
          title: `${siteConfig.name} (RSS)`,
          url: "/feed.xml",
        },
      ],
      "application/atom+xml": [
        {
          title: `${siteConfig.name} (Atom)`,
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
export const createMetadata = (metadata: Metadata & { canonical: string }): Metadata => {
  return {
    ...defaultMetadata,
    ...metadata,
    openGraph: {
      ...defaultMetadata.openGraph,
      title: metadata.title!,
      description: metadata.description!,
      url: metadata.canonical,
      ...metadata.openGraph,
    },
    twitter: {
      ...defaultMetadata.twitter,
      ...metadata.twitter,
    },
    alternates: {
      ...defaultMetadata.alternates,
      canonical: metadata.canonical,
      ...metadata.alternates,
    },
    other: {
      ...defaultMetadata.other,
      ...metadata.other,
    },
  };
};
