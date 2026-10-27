import type { Thing, WithContext } from "schema-dts";

import authorConfig from "@/lib/config/author";
import siteConfig from "@/lib/config/site";

type MetaTag = React.ComponentProps<"meta"> | { title: string };
type LinkTag = React.ComponentProps<"link">;
type ScriptTag = React.ComponentProps<"script">;

export type Head = {
  meta?: MetaTag[];
  links?: LinkTag[];
  scripts?: ScriptTag[];
};

type OpenGraphImage = {
  /** Absolute or root-relative URL. */
  url: string;
  width: number;
  height: number;
  type?: string;
};

const BASE_URL = import.meta.env.VITE_BASE_URL;

const DEFAULT_TITLE = `${siteConfig.name} – ${siteConfig.tagline}`;

const DEFAULT_IMAGE: OpenGraphImage = {
  url: "/opengraph-image.jpg",
  width: 1200,
  height: 1200,
  type: "image/jpeg",
};

const absoluteUrl = (url: string) => (url.startsWith("/") ? `${BASE_URL}${url}` : url);

const imageMeta = (image: OpenGraphImage): MetaTag[] => [
  { property: "og:image", content: absoluteUrl(image.url) },
  { property: "og:image:width", content: `${image.width}` },
  { property: "og:image:height", content: `${image.height}` },
  ...(image.type ? [{ property: "og:image:type", content: image.type }] : []),
];

/** Returns a `head()` script entry for a JSON-LD object. */
export const jsonLd = <T extends Thing>(item: WithContext<T>): ScriptTag => ({
  type: "application/ld+json",
  children: JSON.stringify(item),
});

/** Site-wide defaults, set by the root route. Pages override individual tags with `createHead()`. */
export const defaultHead: Required<Pick<Head, "meta" | "links">> = {
  meta: [
    { charSet: "utf-8" },
    { name: "viewport", content: "width=device-width, initial-scale=1" },
    { title: DEFAULT_TITLE },
    { name: "description", content: siteConfig.description },
    { property: "og:site_name", content: siteConfig.name },
    { property: "og:title", content: DEFAULT_TITLE },
    { property: "og:description", content: siteConfig.description },
    { property: "og:locale", content: import.meta.env.VITE_SITE_LOCALE.replace("-", "_") },
    { property: "og:type", content: "website" },
    ...imageMeta(DEFAULT_IMAGE),
    { name: "twitter:card", content: "summary" },
    { name: "twitter:creator", content: `@${authorConfig.social.twitter}` },
    { name: "humans", content: "/humans.txt" },
  ],
  links: [
    { rel: "icon", href: "/favicon.ico", sizes: "any" },
    { rel: "icon", href: "/icon.png", type: "image/png", sizes: "192x192" },
    { rel: "apple-touch-icon", href: "/apple-icon.png", type: "image/png", sizes: "180x180" },
    { rel: "manifest", href: "/manifest.webmanifest" },
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
  ],
};

/**
 * Builds a page's `head()`, layered over the root route's `defaultHead` (TanStack Router keeps the last `title` and
 * the last `meta` with a given name/property).
 */
export const createHead = ({
  title,
  description,
  canonical,
  image,
  openGraph,
  twitterCard,
  scripts,
}: {
  /** Page title, without the site name (it's appended here). */
  title?: string;
  description?: string;
  /** Root-relative path of the page. */
  canonical: string;
  image?: OpenGraphImage;
  openGraph?: {
    type?: "website" | "article";
    publishedTime?: string;
    modifiedTime?: string;
    authors?: string[];
    tags?: string[];
  };
  twitterCard?: "summary" | "summary_large_image";
  scripts?: ScriptTag[];
}): Head => ({
  meta: [
    ...(title
      ? [{ title: `${title} – ${siteConfig.name}` }, { property: "og:title", content: title }]
      : []),
    ...(description
      ? [
          { name: "description", content: description },
          { property: "og:description", content: description },
        ]
      : []),
    { property: "og:url", content: absoluteUrl(canonical) },
    ...(image ? imageMeta(image) : []),
    ...(openGraph?.type ? [{ property: "og:type", content: openGraph.type }] : []),
    ...(openGraph?.publishedTime
      ? [{ property: "article:published_time", content: openGraph.publishedTime }]
      : []),
    ...(openGraph?.modifiedTime
      ? [{ property: "article:modified_time", content: openGraph.modifiedTime }]
      : []),
    ...(openGraph?.authors ?? []).map((author) => ({
      property: "article:author",
      content: author,
    })),
    ...(openGraph?.tags ?? []).map((tag) => ({ property: "article:tag", content: tag })),
    ...(twitterCard ? [{ name: "twitter:card", content: twitterCard }] : []),
  ],
  links: [{ rel: "canonical", href: absoluteUrl(canonical) }],
  scripts,
});
