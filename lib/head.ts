import authorConfig from "@/lib/config/author";
import siteConfig from "@/lib/config/site";

const BASE_URL =
  typeof import.meta !== "undefined" && import.meta.env?.VITE_BASE_URL
    ? import.meta.env.VITE_BASE_URL
    : (process.env.VITE_BASE_URL ?? "https://jarv.is");

type MetaTag = Record<string, string>;

type HeadOptions = {
  title?: string;
  description?: string;
  canonical: string;
  openGraph?: {
    type?: string;
    authors?: string[];
    tags?: string[];
    publishedTime?: string;
    modifiedTime?: string;
    images?: Array<{ url: string; width?: number; height?: number }>;
  };
  twitter?: {
    card?: string;
  };
};

/**
 * Creates a TanStack Router `head` config object, equivalent to Next.js `createMetadata()`.
 */
export const createHead = (options: HeadOptions) => {
  const title = options.title
    ? `${options.title} – ${siteConfig.name}`
    : `${siteConfig.name} – ${siteConfig.tagline}`;

  const description = options.description || siteConfig.description;
  const canonicalUrl = `${BASE_URL}${options.canonical}`;
  const ogType = options.openGraph?.type || "website";
  const twitterCard = options.twitter?.card || "summary";

  const meta: MetaTag[] = [
    { title },
    { name: "description", content: description },
    // OpenGraph
    { property: "og:site_name", content: siteConfig.name },
    { property: "og:title", content: options.title || title },
    { property: "og:description", content: description },
    { property: "og:url", content: canonicalUrl },
    { property: "og:type", content: ogType },
    { property: "og:locale", content: "en_US" },
    // Twitter
    {
      name: "twitter:creator",
      content: `@${authorConfig.social?.twitter}`,
    },
    { name: "twitter:card", content: twitterCard },
  ];

  // Article-specific OG tags
  if (options.openGraph?.publishedTime) {
    meta.push({
      property: "article:published_time",
      content: options.openGraph.publishedTime,
    });
  }
  if (options.openGraph?.modifiedTime) {
    meta.push({
      property: "article:modified_time",
      content: options.openGraph.modifiedTime,
    });
  }
  if (options.openGraph?.authors) {
    for (const author of options.openGraph.authors) {
      meta.push({ property: "article:author", content: author });
    }
  }
  if (options.openGraph?.tags) {
    for (const tag of options.openGraph.tags) {
      meta.push({ property: "article:tag", content: tag });
    }
  }

  // OG images
  if (options.openGraph?.images) {
    for (const image of options.openGraph.images) {
      meta.push({ property: "og:image", content: image.url });
      if (image.width) {
        meta.push({
          property: "og:image:width",
          content: String(image.width),
        });
      }
      if (image.height) {
        meta.push({
          property: "og:image:height",
          content: String(image.height),
        });
      }
    }
  }

  const links: MetaTag[] = [
    { rel: "canonical", href: canonicalUrl },
    {
      rel: "alternate",
      type: "application/rss+xml",
      title: `${siteConfig.name} (RSS)`,
      href: `${BASE_URL}/feed.xml`,
    },
    {
      rel: "alternate",
      type: "application/atom+xml",
      title: `${siteConfig.name} (Atom)`,
      href: `${BASE_URL}/feed.atom`,
    },
  ];

  return { meta, links };
};
