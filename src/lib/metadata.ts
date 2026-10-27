import type { Thing, WithContext } from "schema-dts";

import authorConfig from "@/lib/config/author";
import siteConfig from "@/lib/config/site";

type MetaTag = React.JSX.IntrinsicElements["meta"];
type LinkTag = React.JSX.IntrinsicElements["link"];
/**
 * A JSON-LD object, which TanStack Router renders (HTML-escaped) as a `<script type="application/ld+json">`. Typed
 * as a meta tag because that's where TanStack Router expects it.
 */
type JsonLdTag = MetaTag & { "script:ld+json": WithContext<Thing> };

export type Head = {
  meta?: MetaTag[];
  links?: LinkTag[];
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

/** Absolute URL for a root-relative path (the homepage is the bare origin, without a trailing slash). */
const absoluteUrl = (url: string) =>
  url === "/" ? BASE_URL : url.startsWith("/") ? `${BASE_URL}${url}` : url;

/** og:title and its Twitter twin. */
const titleMeta = (title: string): MetaTag[] => [
  { property: "og:title", content: title },
  { name: "twitter:title", content: title },
];

const descriptionMeta = (description: string): MetaTag[] => [
  { name: "description", content: description },
  { property: "og:description", content: description },
  { name: "twitter:description", content: description },
];

const imageMeta = ({ url, width, height, type }: OpenGraphImage): MetaTag[] => [
  // Open Graph tags are `property`s, Twitter's are `name`s
  { property: "og:image", content: absoluteUrl(url) },
  { property: "og:image:width", content: `${width}` },
  { property: "og:image:height", content: `${height}` },
  { name: "twitter:image", content: absoluteUrl(url) },
  { name: "twitter:image:width", content: `${width}` },
  { name: "twitter:image:height", content: `${height}` },
  ...(type
    ? [
        { property: "og:image:type", content: type },
        { name: "twitter:image:type", content: type },
      ]
    : []),
];

/** Returns a `head().meta` entry for a JSON-LD object. */
export const jsonLd = <T extends Thing>(item: WithContext<T>): JsonLdTag => ({
  "script:ld+json": item,
});

const baseMeta: MetaTag[] = [
  { charSet: "utf-8" },
  { name: "viewport", content: "width=device-width, initial-scale=1" },
];

const iconLinks: LinkTag[] = [
  { rel: "icon", href: "/favicon.ico", type: "image/x-icon", sizes: "48x48" },
  { rel: "icon", href: "/icon.png", type: "image/png", sizes: "192x192" },
  { rel: "apple-touch-icon", href: "/apple-icon.png", type: "image/png", sizes: "180x180" },
  { rel: "manifest", href: "/manifest.webmanifest" },
];

/** Site-wide defaults, set by the root route. Pages override individual tags with `createHead()`. */
export const defaultHead: Required<Head> = {
  meta: [
    ...baseMeta,
    { title: DEFAULT_TITLE },
    ...descriptionMeta(siteConfig.description),
    ...titleMeta(DEFAULT_TITLE),
    { property: "og:site_name", content: siteConfig.name },
    { property: "og:locale", content: import.meta.env.VITE_SITE_LOCALE.replace("-", "_") },
    { property: "og:type", content: "website" },
    ...imageMeta(DEFAULT_IMAGE),
    { name: "twitter:card", content: "summary" },
    { name: "twitter:creator", content: `@${authorConfig.social.twitter}` },
    { name: "humans", content: "/humans.txt" },
  ],
  links: [
    ...iconLinks,
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

/** Replaces `defaultHead` (rather than layering on it) when the root route renders its not-found page. */
export const notFoundHead: Required<Head> = {
  meta: [
    ...baseMeta,
    { title: `Page Not Found – ${siteConfig.name}` },
    ...titleMeta(`Page Not Found – ${siteConfig.name}`),
    { name: "robots", content: "noindex" },
    ...imageMeta(DEFAULT_IMAGE),
    { name: "twitter:card", content: "summary" },
    { name: "twitter:creator", content: `@${authorConfig.social.twitter}` },
    { name: "humans", content: "/humans.txt" },
  ],
  links: iconLinks,
};

/**
 * Builds a page's `head()`, layered over the root route's `defaultHead` (TanStack Router keeps the last `title` and
 * the last `meta` with a given name/property, so tags that repeat, like `article:tag`, have to be rendered in the
 * page's component instead).
 */
export const createHead = ({
  title,
  description,
  canonical,
  image,
  openGraph,
  twitterCard,
  jsonLd: jsonLdItems = [],
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
    author?: string;
    video?: { url: string; type: string };
  };
  twitterCard?: "summary" | "summary_large_image";
  jsonLd?: JsonLdTag[];
}): Head => ({
  meta: [
    ...(title ? [{ title: `${title} – ${siteConfig.name}` }, ...titleMeta(title)] : []),
    ...(description ? descriptionMeta(description) : []),
    { property: "og:url", content: absoluteUrl(canonical) },
    ...(image ? imageMeta(image) : []),
    ...(openGraph?.type ? [{ property: "og:type", content: openGraph.type }] : []),
    ...(openGraph?.publishedTime
      ? [{ property: "article:published_time", content: openGraph.publishedTime }]
      : []),
    ...(openGraph?.modifiedTime
      ? [{ property: "article:modified_time", content: openGraph.modifiedTime }]
      : []),
    ...(openGraph?.author ? [{ property: "article:author", content: openGraph.author }] : []),
    ...(openGraph?.video
      ? [
          { property: "og:video", content: openGraph.video.url },
          { property: "og:video:type", content: openGraph.video.type },
        ]
      : []),
    ...(twitterCard ? [{ name: "twitter:card", content: twitterCard }] : []),
    ...jsonLdItems,
  ],
  links: [{ rel: "canonical", href: absoluteUrl(canonical) }],
});
