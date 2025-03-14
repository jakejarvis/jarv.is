import { Suspense } from "react";
import { ErrorBoundary } from "react-error-boundary";
import { CalendarIcon, TagIcon, SquarePenIcon, EyeIcon } from "lucide-react";
import Link from "../../../components/Link";
import Time from "../../../components/Time";
import Comments from "../../../components/Comments";
import Loading from "../../../components/Loading";
import HitCounter from "./counter";
import { getPostSlugs, getFrontMatter } from "../../../lib/helpers/posts";
import { metadata as defaultMetadata } from "../../layout";
import * as config from "../../../lib/config";
import { BASE_URL } from "../../../lib/config/constants";
import type { Metadata, Route } from "next";
import type { Article, WithContext } from "schema-dts";

import styles from "./page.module.css";

// https://nextjs.org/docs/app/api-reference/functions/generate-static-params#disable-rendering-for-unspecified-paths
export const dynamicParams = false;

// https://nextjs.org/docs/app/building-your-application/rendering/partial-prerendering#using-partial-prerendering
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

  return {
    title: frontmatter.title,
    description: frontmatter.description,
    openGraph: {
      ...defaultMetadata.openGraph,
      title: frontmatter.title,
      url: `/notes/${slug}`,
      type: "article",
      authors: [config.authorName],
      tags: frontmatter.tags,
      publishedTime: frontmatter.date,
      modifiedTime: frontmatter.date,
    },
    twitter: {
      ...defaultMetadata.twitter,
      card: "summary_large_image",
    },
    alternates: {
      ...defaultMetadata.alternates,
      canonical: `/notes/${slug}`,
    },
  };
};

const Page = async ({ params }: { params: Promise<{ slug: string }> }) => {
  const { slug } = await params;
  const frontmatter = await getFrontMatter(slug);

  const jsonLd: WithContext<Article> = {
    "@context": "https://schema.org",
    "@type": "Article",
    name: frontmatter.title,
    description: frontmatter.description || config.longDescription,
    url: frontmatter.permalink,
    datePublished: frontmatter.date,
    dateModified: frontmatter.date,
    author: {
      "@type": "Person",
      name: config.authorName,
      url: BASE_URL,
    },
  };

  const { default: MDXContent } = await import(`../../../notes/${slug}/index.mdx`);

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      <div className={styles.meta}>
        <div className={styles.metaItem}>
          <Link href={`/notes/${frontmatter.slug}` as Route} plain className={styles.metaLink}>
            <CalendarIcon size="1.2em" className={styles.metaIcon} />
            <Time date={frontmatter.date} format="MMMM D, YYYY" />
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
          <Comments title={frontmatter.title} />
        </div>
      )}
    </>
  );
};

export default Page;
