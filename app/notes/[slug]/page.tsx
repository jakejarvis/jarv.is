import { env } from "@/lib/env";
import { Suspense } from "react";
import { cacheLife } from "next/cache";
import { JsonLd } from "react-schemaorg";
import { formatDate, formatDateISO } from "@/lib/date";
import { CalendarDaysIcon, TagIcon, SquarePenIcon, EyeIcon, MessagesSquareIcon } from "lucide-react";
import Link from "@/components/link";
import ViewCounter from "@/components/view-counter";
import Comments from "@/components/comments/comments";
import CommentsSkeleton from "@/components/comments/comments-skeleton";
import { getSlugs, getFrontMatter, POSTS_DIR } from "@/lib/posts";
import { createMetadata } from "@/lib/metadata";
import siteConfig from "@/lib/config/site";
import authorConfig from "@/lib/config/author";
import { size as ogImageSize } from "./opengraph-image";
import { getCommentCounts } from "@/lib/server/comments";
import type { Metadata } from "next";
import type { BlogPosting } from "schema-dts";

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
      authors: [authorConfig.name],
      tags: frontmatter!.tags,
      publishedTime: frontmatter!.date,
      modifiedTime: frontmatter!.date,
    },
    twitter: {
      card: "summary_large_image",
    },
  });
};

// Cached helper to format dates - needed for Cache Components compatibility
const getFormattedDates = async (date: string) => {
  "use cache";
  cacheLife("max");

  return {
    dateISO: formatDateISO(date),
    dateTitle: formatDate(date, "MMM d, y, h:mm a O"),
    dateDisplay: formatDate(date, "MMMM d, y"),
  };
};

const Page = async ({ params }: { params: Promise<{ slug: string }> }) => {
  const { slug } = await params;
  const frontmatter = await getFrontMatter(slug);
  const commentCount = await getCommentCounts(`${POSTS_DIR}/${slug}`);
  const formattedDates = await getFormattedDates(frontmatter!.date);

  const { default: MDXContent } = await import(`../../../${POSTS_DIR}/${slug}/index.mdx`);

  return (
    <>
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
          license: `https://spdx.org/licenses/${siteConfig.license}.html`,
          author: {
            // defined in app/layout.tsx
            "@id": `${env.NEXT_PUBLIC_BASE_URL}/#person`,
          },
        }}
      />

      <div className="text-foreground/70 -mt-1 flex flex-wrap justify-items-start gap-x-4 text-[0.8rem] leading-9 tracking-wide md:text-[0.85rem]">
        <Link
          href={`/${POSTS_DIR}/${frontmatter!.slug}`}
          className={"text-foreground/70 flex flex-nowrap items-center gap-x-2 whitespace-nowrap hover:no-underline"}
        >
          <CalendarDaysIcon className="inline size-4 shrink-0" />
          <time dateTime={formattedDates.dateISO} title={formattedDates.dateTitle}>
            {formattedDates.dateDisplay}
          </time>
        </Link>

        {frontmatter!.tags && (
          <div className="flex flex-wrap items-center gap-x-2 whitespace-nowrap">
            <TagIcon className="inline size-4 shrink-0" />
            {frontmatter!.tags.map((tag) => (
              <span
                key={tag}
                title={tag}
                className="before:text-foreground/40 lowercase before:pr-0.5 before:content-['\0023'] last-of-type:mr-0"
                aria-label={`Tagged with ${tag}`}
              >
                {tag}
              </span>
            ))}
          </div>
        )}

        <Link
          href={`https://github.com/${env.NEXT_PUBLIC_GITHUB_REPO}/blob/main/${POSTS_DIR}/${frontmatter!.slug}/index.mdx`}
          title={`Edit "${frontmatter!.title}" on GitHub`}
          className={"text-foreground/70 flex flex-nowrap items-center gap-x-2 whitespace-nowrap hover:no-underline"}
        >
          <SquarePenIcon className="inline size-4 shrink-0" />
          <span>Improve This Post</span>
        </Link>

        <Link
          href={`/${POSTS_DIR}/${frontmatter!.slug}#comments`}
          title={`${Intl.NumberFormat(env.NEXT_PUBLIC_SITE_LOCALE).format(commentCount || 0)} ${commentCount === 1 ? "comment" : "comments"}`}
          className="text-foreground/70 flex flex-nowrap items-center gap-x-2 whitespace-nowrap hover:no-underline"
        >
          <MessagesSquareIcon className="inline size-4 shrink-0" />
          <span>{Intl.NumberFormat(env.NEXT_PUBLIC_SITE_LOCALE).format(commentCount || 0)}</span>
        </Link>

        <div className="flex min-w-14 flex-nowrap items-center gap-x-2 whitespace-nowrap">
          <EyeIcon className="inline size-4 shrink-0" />
          <ViewCounter slug={`${POSTS_DIR}/${frontmatter!.slug}`} />
        </div>
      </div>

      <h1 className="mt-2 mb-3 text-3xl/10 font-bold md:text-4xl/12">
        <Link
          href={`/${POSTS_DIR}/${frontmatter!.slug}`}
          dangerouslySetInnerHTML={{ __html: frontmatter!.htmlTitle || frontmatter!.title }}
          className="text-foreground hover:no-underline"
        />
      </h1>

      <MDXContent />

      <section id="comments" className="isolate my-8 w-full border-t-2 pt-8">
        <div className="mx-auto w-full max-w-3xl space-y-6">
          {frontmatter!.noComments ? (
            <div className="bg-muted/40 flex justify-center rounded-lg px-6 py-12">
              <p className="text-center text-lg font-medium">Comments are closed.</p>
            </div>
          ) : (
            <Suspense fallback={<CommentsSkeleton />}>
              <Comments slug={`${POSTS_DIR}/${frontmatter!.slug}`} />
            </Suspense>
          )}
        </div>
      </section>
    </>
  );
};

export default Page;
