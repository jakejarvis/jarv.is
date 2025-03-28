import defaultMetadata from "../config/metadata";
import type { Metadata } from "next";

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
