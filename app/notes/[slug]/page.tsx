import { env } from "../../../lib/env";
import { Suspense } from "react";
import { JsonLd } from "react-schemaorg";
import clsx from "clsx";
import { CalendarDaysIcon, TagIcon, SquarePenIcon, EyeIcon } from "lucide-react";
import Link from "../../../components/Link";
import Time from "../../../components/Time";
import Comments from "../../../components/Comments";
import Loading from "../../../components/Loading";
import HitCounter from "./counter";
import { getSlugs, getFrontMatter } from "../../../lib/helpers/posts";
import { createMetadata } from "../../../lib/helpers/metadata";
import * as config from "../../../lib/config";
import { POSTS_DIR } from "../../../lib/config/constants";
import { size as ogImageSize } from "./opengraph-image";
import type { Metadata } from "next";
import type { BlogPosting } from "schema-dts";

import styles from "./page.module.css";

// https://nextjs.org/docs/app/api-reference/functions/generate-static-params#disable-rendering-for-unspecified-paths
export const dynamicParams = false;

// https://nextjs.org/docs/app/building-your-application/rendering/partial-prerendering#using-partial-prerendering
export const experimental_ppr = true;

export const generateStaticParams = async () => {
  const slugs = await getSlugs();

  // map slugs into a static paths object required by next.js
  return slugs.map((slug) => ({
    slug,
  }));
};

export const generateMetadata = async ({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> => {
  const { slug } = await params;
  const frontmatter = await getFrontMatter(slug);

  return createMetadata({
    title: frontmatter!.title,
    description: frontmatter!.description,
    canonical: `/${POSTS_DIR}/${slug}`,
    openGraph: {
      type: "article",
      authors: [config.authorName],
      tags: frontmatter!.tags,
      publishedTime: frontmatter!.date,
      modifiedTime: frontmatter!.date,
    },
    twitter: {
      card: "summary_large_image",
    },
  });
};

const Page = async ({ params }: { params: Promise<{ slug: string }> }) => {
  const { slug } = await params;
  const frontmatter = await getFrontMatter(slug);

  const { default: MDXContent } = await import(`../../../${POSTS_DIR}/${slug}/index.mdx`);

  return (
    <article>
      <JsonLd<BlogPosting>
        item={{
          "@context": "https://schema.org",
          "@type": "BlogPosting",
          headline: frontmatter!.title,
          description: frontmatter!.description,
          url: frontmatter!.permalink,
          image: {
            "@type": "ImageObject",
            contentUrl: `${env.NEXT_PUBLIC_BASE_URL}/${POSTS_DIR}/${frontmatter!.slug}/opengraph-image`,
            width: `${ogImageSize.width}`,
            height: `${ogImageSize.height}`,
          },
          keywords: frontmatter!.tags?.join(", "),
          datePublished: frontmatter!.date,
          dateModified: frontmatter!.date,
          inLanguage: env.NEXT_PUBLIC_SITE_LOCALE,
          license: config.licenseUrl,
          author: {
            // defined in app/layout.tsx
            "@id": `${env.NEXT_PUBLIC_BASE_URL}/#person`,
          },
        }}
      />

      <div className={styles.meta}>
        <Link href={`/${POSTS_DIR}/${frontmatter!.slug}`} plain className={clsx(styles.metaItem, styles.metaLink)}>
          <CalendarDaysIcon size="1.25em" className={styles.metaIcon} />
          <Time date={frontmatter!.date} format="MMMM d, y" />
        </Link>

        {frontmatter!.tags && (
          <div className={styles.metaItem}>
            <TagIcon size="1.25em" className={styles.metaIcon} />
            <span className={styles.metaTags}>
              {frontmatter!.tags.map((tag) => (
                <span key={tag} title={tag} className={styles.metaTag} aria-label={`Tagged with ${tag}`}>
                  {tag}
                </span>
              ))}
            </span>
          </div>
        )}

        <Link
          href={`https://github.com/${env.NEXT_PUBLIC_GITHUB_REPO}/blob/main/${POSTS_DIR}/${frontmatter!.slug}/index.mdx`}
          title={`Edit "${frontmatter!.title}" on GitHub`}
          plain
          className={clsx(styles.metaItem, styles.metaLink)}
        >
          <SquarePenIcon size="1.25em" className={styles.metaIcon} />
          <span>Improve This Post</span>
        </Link>

        <div
          className={styles.metaItem}
          style={{
            // fix potential layout shift when number of hits loads
            minWidth: "6em",
            marginRight: 0,
          }}
        >
          <EyeIcon size="1.25em" className={styles.metaIcon} />
          <Suspense
            // when this loads, the component will count up from zero to the actual number of hits, so we can simply
            // show a zero here as a "loading indicator"
            fallback={<span>0</span>}
          >
            <HitCounter slug={`${POSTS_DIR}/${frontmatter!.slug}`} />
          </Suspense>
        </div>
      </div>

      <h1 className={styles.title}>
        <Link
          href={`/${POSTS_DIR}/${frontmatter!.slug}`}
          dangerouslySetInnerHTML={{ __html: frontmatter!.htmlTitle || frontmatter!.title }}
          plain
          className={styles.link}
        />
      </h1>

      <MDXContent />

      {!frontmatter!.noComments && (
        <div id="comments" className={styles.comments}>
          <Suspense fallback={<Loading boxes={3} width={40} style={{ display: "block", margin: "2em auto" }} />}>
            <Comments title={frontmatter!.title} />
          </Suspense>
        </div>
      )}
    </article>
  );
};

export default Page;
