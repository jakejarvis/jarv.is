import { Suspense } from "react";
import { ErrorBoundary } from "react-error-boundary";
import { JsonLd } from "react-schemaorg";
import { CalendarIcon, TagIcon, SquarePenIcon, EyeIcon } from "lucide-react";
import Link from "../../../components/Link";
import Time from "../../../components/Time";
import Comments from "../../../components/Comments";
import Loading from "../../../components/Loading";
import HitCounter from "./counter";
import { getPostSlugs, getFrontMatter } from "../../../lib/helpers/posts";
import { addMetadata } from "../../../lib/helpers/metadata";
import * as config from "../../../lib/config";
import { BASE_URL } from "../../../lib/config/constants";
import type { Metadata, Route } from "next";
import type { Article } from "schema-dts";

import styles from "./page.module.css";

// https://nextjs.org/docs/app/api-reference/functions/generate-static-params#disable-rendering-for-unspecified-paths
export const dynamicParams = false;

// https://nextjs.org/docs/app/building-your-application/rendering/partial-prerendering#using-partial-prerendering
// eslint-disable-next-line camelcase
export const experimental_ppr = true;

export const generateStaticParams = async () => {
  const slugs = await getPostSlugs();

  // map slugs into a static paths object required by next.js
  return slugs.map((slug) => ({
    slug,
  }));
};

export const generateMetadata = async ({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> => {
  const { slug } = await params;
  const frontmatter = await getFrontMatter(slug);

  return addMetadata({
    title: frontmatter.title,
    description: frontmatter.description,
    openGraph: {
      type: "article",
      authors: [config.authorName],
      tags: frontmatter.tags,
      publishedTime: frontmatter.date,
      modifiedTime: frontmatter.date,
    },
    twitter: {
      card: "summary_large_image",
    },
    alternates: {
      canonical: `/notes/${slug}`,
    },
  });
};

const Page = async ({ params }: { params: Promise<{ slug: string }> }) => {
  const { slug } = await params;
  const frontmatter = await getFrontMatter(slug);

  const { default: MDXContent } = await import(`../../../notes/${slug}/index.mdx`);

  return (
    <>
      <JsonLd<Article>
        item={{
          "@context": "https://schema.org",
          "@type": "Article",
          headline: frontmatter.title,
          description: frontmatter.description,
          url: frontmatter.permalink,
          image: [`${BASE_URL}/notes/${slug}/opengraph-image`],
          keywords: frontmatter.tags,
          datePublished: frontmatter.date,
          dateModified: frontmatter.date,
          inLanguage: config.siteLocale,
          license: config.licenseUrl,
          author: {
            // defined in app/layout.tsx
            "@id": `${BASE_URL}/#person`,
          },
        }}
      />

      <div className={styles.meta}>
        <div className={styles.metaItem}>
          <Link href={`/notes/${frontmatter.slug}` as Route} plain className={styles.metaLink}>
            <CalendarIcon size="1.2em" className={styles.metaIcon} />
            <Time date={frontmatter.date} format="MMMM d, y" />
          </Link>
        </div>

        {frontmatter.tags && (
          <div className={styles.metaItem}>
            <TagIcon size="1.2em" className={styles.metaIcon} />
            <span className={styles.metaTags}>
              {frontmatter.tags.map((tag) => (
                <span key={tag} title={tag} className={styles.metaTag} aria-label={`Tagged with ${tag}`}>
                  {tag}
                </span>
              ))}
            </span>
          </div>
        )}

        <div className={styles.metaItem}>
          <Link
            href={`https://github.com/${config.githubRepo}/blob/main/notes/${frontmatter.slug}/index.mdx`}
            title={`Edit "${frontmatter.title}" on GitHub`}
            plain
            className={styles.metaLink}
          >
            <SquarePenIcon size="1.2em" className={styles.metaIcon} />
            <span>Improve This Post</span>
          </Link>
        </div>

        {/* only count hits on production site */}
        {process.env.NEXT_PUBLIC_VERCEL_ENV !== "development" && process.env.NODE_ENV !== "development" ? (
          <ErrorBoundary fallback={null}>
            <div
              className={styles.metaItem}
              style={{
                // fix potential layout shift when number of hits loads
                minWidth: "7em",
                marginRight: 0,
              }}
            >
              <EyeIcon size="1.2em" className={styles.metaIcon} />
              <Suspense fallback={<Loading boxes={3} width={20} />}>
                <HitCounter slug={`notes/${frontmatter.slug}`} />
              </Suspense>
            </div>
          </ErrorBoundary>
        ) : null}
      </div>

      <h1 className={styles.title}>
        <Link
          href={`/notes/${frontmatter.slug}` as Route}
          dangerouslySetInnerHTML={{ __html: frontmatter.htmlTitle || frontmatter.title }}
          plain
          className={styles.link}
        />
      </h1>

      <MDXContent />

      {!frontmatter.noComments && (
        <div id="comments" className={styles.comments}>
          <Suspense fallback={<Loading boxes={3} width={40} style={{ display: "block", margin: "2em auto" }} />}>
            <Comments title={frontmatter.title} />
          </Suspense>
        </div>
      )}
    </>
  );
};

export default Page;
