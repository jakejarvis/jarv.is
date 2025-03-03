import { Suspense } from "react";
import { ErrorBoundary } from "react-error-boundary";
import Content from "../../../components/Content";
import Link from "../../../components/Link";
import Time from "../../../components/Time";
import Comments from "../../../components/Comments";
import Loading from "../../../components/Loading";
import HitCounter from "./counter";
import { getPostSlugs, getPostData } from "../../../lib/helpers/posts";
import { metadata as defaultMetadata } from "../../layout";
import config from "../../../lib/config";
import { FiCalendar, FiTag, FiEdit, FiEye } from "react-icons/fi";
import type { Metadata, Route } from "next";
import type { Article, WithContext } from "schema-dts";

import styles from "./page.module.css";

// https://nextjs.org/docs/app/api-reference/functions/generate-static-params#disable-rendering-for-unspecified-paths
export const dynamicParams = false;

// https://nextjs.org/docs/app/building-your-application/rendering/partial-prerendering#using-partial-prerendering
export const experimental_ppr = true;

export async function generateStaticParams() {
  const slugs = await getPostSlugs();

  // map slugs into a static paths object required by next.js
  return slugs.map((slug) => ({
    slug,
  }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const { frontMatter } = await getPostData(slug);

  return {
    title: frontMatter.title,
    description: frontMatter.description,
    openGraph: {
      ...defaultMetadata.openGraph,
      title: frontMatter.title,
      url: `/notes/${slug}`,
      type: "article",
      authors: [config.authorName],
      tags: frontMatter.tags,
      publishedTime: frontMatter.date,
      modifiedTime: frontMatter.date,
      images: frontMatter.image
        ? [{ url: frontMatter.image, alt: frontMatter.title }]
        : defaultMetadata.openGraph?.images,
    },
    alternates: {
      ...defaultMetadata.alternates,
      canonical: `/notes/${slug}`,
    },
  };
}

export default async function Page({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const { frontMatter } = await getPostData(slug);

  const jsonLd: WithContext<Article> = {
    "@context": "https://schema.org",
    "@type": "Article",
    name: frontMatter.title,
    description: frontMatter.description || config.longDescription,
    url: frontMatter.permalink,
    image: frontMatter.image,
    datePublished: frontMatter.date,
    dateModified: frontMatter.date,
    author: {
      "@type": "Person",
      name: config.authorName,
      url: config.baseUrl,
    },
  };

  const { default: MDXContent } = await import(`../../../notes/${slug}.mdx`);

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      <div className={styles.meta}>
        <div className={styles.metaItem}>
          <Link href={`/notes/${frontMatter.slug}` as Route} plain className={styles.metaLink}>
            <FiCalendar className={styles.metaIcon} />
            <Time date={frontMatter.date} format="MMMM D, YYYY" />
          </Link>
        </div>

        {frontMatter.tags && (
          <div className={styles.metaItem}>
            <FiTag className={styles.metaIcon} />
            <span className={styles.metaTags}>
              {frontMatter.tags.map((tag) => (
                <span key={tag} title={tag} className={styles.metaTag} aria-label={`Tagged with ${tag}`}>
                  {tag}
                </span>
              ))}
            </span>
          </div>
        )}

        <div className={styles.metaItem}>
          <Link
            href={`https://github.com/${config.githubRepo}/blob/main/notes/${frontMatter.slug}.mdx`}
            title={`Edit "${frontMatter.title}" on GitHub`}
            plain
            className={styles.metaLink}
          >
            <FiEdit className={styles.metaIcon} />
            <span>Improve This Post</span>
          </Link>
        </div>

        {/* only count hits on production site */}
        {process.env.NEXT_PUBLIC_VERCEL_ENV === "production" && (
          <ErrorBoundary fallback={null}>
            <div
              className={styles.metaItem}
              style={{
                // fix potential layout shift when number of hits loads
                minWidth: "7em",
                marginRight: 0,
              }}
            >
              <FiEye className={styles.metaIcon} />
              <Suspense fallback={<Loading boxes={3} width={20} />}>
                <HitCounter slug={`notes/${frontMatter.slug}`} />
              </Suspense>
            </div>
          </ErrorBoundary>
        )}
      </div>

      <h1 className={styles.title}>
        <Link
          href={`/notes/${frontMatter.slug}` as Route}
          dangerouslySetInnerHTML={{ __html: frontMatter.htmlTitle || frontMatter.title }}
          plain
          className={styles.link}
        />
      </h1>

      <Content>
        <MDXContent />
      </Content>

      {!frontMatter.noComments && (
        <div id="comments">
          <Comments title={frontMatter.title} />
        </div>
      )}
    </>
  );
}
