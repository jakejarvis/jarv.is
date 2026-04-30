import { IconCalendarEvent, IconEdit, IconEye, IconMessages, IconTag } from "@tabler/icons-react";
import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Suspense, ViewTransition } from "react";
import { JsonLd } from "react-schemaorg";
import type { BlogPosting } from "schema-dts";

import { CommentCount } from "@/components/comment-count";
import { Comments } from "@/components/comments/comments";
import { CommentsSkeleton } from "@/components/comments/comments-skeleton";
import { DirectionalTransition } from "@/components/page-transition";
import { ViewCounter } from "@/components/view-counter";
import authorConfig from "@/lib/config/author";
import siteConfig from "@/lib/config/site";
import { createMetadata } from "@/lib/metadata";
import { getFrontMatter, getSlugs, POSTS_DIR } from "@/lib/posts";

import { size as ogImageSize } from "./opengraph-image";

export const generateStaticParams = async () => {
  const slugs = await getSlugs();

  // map slugs into a static paths object required by next.js
  return slugs.map((slug) => ({
    slug,
  }));
};

export const generateMetadata = async ({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> => {
  const { slug } = await params;
  const frontmatter = await getFrontMatter(slug);

  return createMetadata({
    title: frontmatter?.title,
    description: frontmatter?.description,
    canonical: `/${POSTS_DIR}/${slug}`,
    openGraph: {
      type: "article",
      authors: [authorConfig.name],
      tags: frontmatter?.tags,
      publishedTime: frontmatter?.date,
      modifiedTime: frontmatter?.date,
    },
    twitter: {
      card: "summary_large_image",
    },
  });
};

const Page = async ({ params }: { params: Promise<{ slug: string }> }) => {
  const { slug } = await params;
  const frontmatter = await getFrontMatter(slug);
  if (!frontmatter) notFound();
  const d = new Date(frontmatter.date);

  const formattedDates = {
    dateISO: d.toISOString(),
    dateTitle: d.toLocaleString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
      hour: "numeric",
      minute: "2-digit",
      timeZoneName: "short",
    }),
    dateDisplay: d.toLocaleDateString("en-US", {
      month: "long",
      day: "numeric",
      year: "numeric",
    }),
  };

  const { default: MDXContent } = await import(`../../../${POSTS_DIR}/${slug}/index.mdx`);

  return (
    <DirectionalTransition>
      <JsonLd<BlogPosting>
        item={{
          "@context": "https://schema.org",
          "@type": "BlogPosting",
          headline: frontmatter?.title,
          description: frontmatter?.description,
          url: frontmatter?.permalink,
          image: {
            "@type": "ImageObject",
            contentUrl: `${process.env.NEXT_PUBLIC_BASE_URL}/${POSTS_DIR}/${frontmatter?.slug}/opengraph-image`,
            width: `${ogImageSize.width}`,
            height: `${ogImageSize.height}`,
          },
          keywords: frontmatter?.tags?.join(", "),
          datePublished: frontmatter?.date,
          dateModified: frontmatter?.date,
          inLanguage: process.env.NEXT_PUBLIC_SITE_LOCALE,
          license: `https://spdx.org/licenses/${siteConfig.license}.html`,
          author: {
            // defined in app/layout.tsx
            "@id": `${process.env.NEXT_PUBLIC_BASE_URL}/#person`,
          },
        }}
      />

      <div className="text-foreground/70 flex flex-wrap items-center gap-x-4 gap-y-2.5 text-[13px] tracking-wide">
        <Link
          href={`/${POSTS_DIR}/${frontmatter?.slug}`}
          className={
            "flex flex-nowrap items-center gap-1.5 whitespace-nowrap text-inherit hover:no-underline"
          }
        >
          <IconCalendarEvent className="inline size-3.5 shrink-0" aria-hidden="true" />
          <time
            dateTime={formattedDates.dateISO}
            title={formattedDates.dateTitle}
            suppressHydrationWarning
          >
            {formattedDates.dateDisplay}
          </time>
        </Link>

        {frontmatter?.tags && (
          <div className="flex flex-wrap items-center gap-1.5">
            <IconTag className="inline size-3.5 shrink-0" aria-hidden="true" />
            {frontmatter?.tags.map((tag) => (
              <span
                key={tag}
                title={tag}
                className="before:text-foreground/40 mx-px lowercase before:pr-0.5 before:content-['#'] first-of-type:ml-0 last-of-type:mr-0"
              >
                {tag}
              </span>
            ))}
          </div>
        )}

        <Link
          href={`https://github.com/${process.env.NEXT_PUBLIC_GITHUB_REPO}/blob/main/${POSTS_DIR}/${frontmatter?.slug}/index.mdx`}
          title={`Edit "${frontmatter?.title}" on GitHub`}
          className={
            "flex flex-nowrap items-center gap-1.5 whitespace-nowrap text-inherit hover:no-underline"
          }
        >
          <IconEdit className="inline size-3.5 shrink-0" aria-hidden="true" />
          <span>Improve This Post</span>
        </Link>

        <Link
          href={`/${POSTS_DIR}/${frontmatter?.slug}#comments`}
          className="flex flex-nowrap items-center gap-1.5 whitespace-nowrap text-inherit hover:no-underline"
        >
          <IconMessages className="inline size-3.5 shrink-0" aria-hidden="true" />
          <CommentCount slug={`${POSTS_DIR}/${frontmatter?.slug}`} />
        </Link>

        <div className="flex min-w-14 flex-nowrap items-center gap-1.5 whitespace-nowrap">
          <IconEye className="inline size-3.5 shrink-0" aria-hidden="true" />
          <ViewCounter slug={`${POSTS_DIR}/${frontmatter?.slug}`} />
        </div>
      </div>

      <ViewTransition name={`note-title-${frontmatter.slug}`} share="text-morph" default="none">
        <h1 className="my-5 text-2xl font-medium tracking-tight">
          <Link
            href={`/${POSTS_DIR}/${frontmatter.slug}`}
            dangerouslySetInnerHTML={{
              __html: frontmatter.htmlTitle || frontmatter.title,
            }}
            className="text-foreground hover:no-underline"
          />
        </h1>
      </ViewTransition>

      <article className="markdown">
        <MDXContent />
      </article>

      <section id="comments" className="isolate my-8 w-full border-t-2 pt-8">
        <div className="mx-auto w-full max-w-3xl space-y-6">
          {frontmatter?.noComments ? (
            <div className="bg-muted/40 flex justify-center rounded-lg px-6 py-12">
              <p className="text-center text-lg font-medium">Comments are closed.</p>
            </div>
          ) : (
            <Suspense
              fallback={
                <ViewTransition exit="slide-down">
                  <CommentsSkeleton />
                </ViewTransition>
              }
            >
              <ViewTransition enter="slide-up" default="none">
                <Comments slug={`${POSTS_DIR}/${frontmatter.slug}`} />
              </ViewTransition>
            </Suspense>
          )}
        </div>
      </section>
    </DirectionalTransition>
  );
};

export default Page;
