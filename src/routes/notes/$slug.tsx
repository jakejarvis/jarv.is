import { MDXContent } from "@content-collections/mdx/react";
import { Link, createFileRoute, notFound } from "@tanstack/react-router";
import { allPosts } from "content-collections";
import { CalendarDaysIcon, SquarePenIcon, TagIcon } from "lucide-react";

import { ImageDiff } from "@/components/image-diff";
import { CodePen } from "@/components/third-party/codepen";
import { Gist } from "@/components/third-party/gist";
import { Tweet } from "@/components/third-party/tweet";
import { YouTube } from "@/components/third-party/youtube";
import { Video } from "@/components/video";
import authorConfig from "@/lib/config/author";
import siteConfig from "@/lib/config/site";
import { createHead } from "@/lib/head";

const BASE_URL = import.meta.env.VITE_BASE_URL || "https://jarv.is";
const GITHUB_REPO = import.meta.env.VITE_GITHUB_REPO || "jakejarvis/jarv.is";

export const Route = createFileRoute("/notes/$slug")({
  loader: ({ params }) => {
    const post = allPosts.find((p) => p.slug === params.slug);
    if (!post) throw notFound();
    return { post };
  },
  head: ({ loaderData }) => {
    const { post } = loaderData;
    return createHead({
      title: post.title,
      description: post.description,
      canonical: `/notes/${post.slug}`,
      openGraph: {
        type: "article",
        authors: [authorConfig.name],
        tags: post.tags,
        publishedTime: post.date,
        modifiedTime: post.date,
        images: [
          {
            url: `${BASE_URL}/notes/${post.slug}/opengraph-image`,
            width: 1200,
            height: 630,
          },
        ],
      },
      twitter: {
        card: "summary_large_image",
      },
    });
  },
  component: PostPage,
});

function PostPage() {
  const { post } = Route.useLoaderData();
  const d = new Date(post.date);

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

  return (
    <>
      <div className="text-foreground/70 flex flex-wrap justify-items-start gap-4 text-[13px] tracking-wide">
        <Link
          to="/notes/$slug"
          params={{ slug: post.slug }}
          className="text-foreground/70 flex flex-nowrap items-center gap-1.5 whitespace-nowrap hover:no-underline"
        >
          <CalendarDaysIcon className="inline size-3 shrink-0" aria-hidden="true" />
          <time
            dateTime={formattedDates.dateISO}
            title={formattedDates.dateTitle}
            suppressHydrationWarning
          >
            {formattedDates.dateDisplay}
          </time>
        </Link>

        {post.tags && (
          <div className="flex flex-wrap items-center gap-1.5">
            <TagIcon className="inline size-3 shrink-0" aria-hidden="true" />
            {post.tags.map((tag) => (
              <span
                key={tag}
                title={tag}
                className="before:text-foreground/40 mx-px lowercase before:pr-0.5 before:content-['\\0023'] first-of-type:ml-0 last-of-type:mr-0"
              >
                {tag}
              </span>
            ))}
          </div>
        )}

        <a
          href={`https://github.com/${GITHUB_REPO}/blob/main/notes/${post.slug}/index.mdx`}
          title={`Edit "${post.title}" on GitHub`}
          target="_blank"
          rel="noopener noreferrer"
          className="text-foreground/70 flex flex-nowrap items-center gap-1.5 whitespace-nowrap hover:no-underline"
        >
          <SquarePenIcon className="inline size-3 shrink-0" aria-hidden="true" />
          <span>Improve This Post</span>
        </a>
      </div>

      <h1
        className="my-5 text-3xl font-medium tracking-tight"
        style={{ viewTransitionName: `note-title-${post.slug}` }}
      >
        <Link
          to="/notes/$slug"
          params={{ slug: post.slug }}
          // biome-ignore lint/security/noDangerouslySetInnerHtml: htmlTitle is sanitized by rehypeSanitize
          dangerouslySetInnerHTML={{
            __html: post.htmlTitle || post.title,
          }}
          className="text-foreground hover:no-underline"
        />
      </h1>

      <article className="prose prose-neutral dark:prose-invert prose-sm max-w-none">
        <MDXContent
          code={post.mdx}
          components={{
            Video,
            ImageDiff,
            Tweet,
            YouTube,
            Gist,
            CodePen,
          }}
        />
      </article>

      <section id="comments" className="isolate my-8 w-full border-t-2 pt-8">
        <div className="mx-auto w-full max-w-3xl space-y-6">
          {post.noComments ? (
            <div className="bg-muted/40 flex justify-center rounded-lg px-6 py-12">
              <p className="text-center text-lg font-medium">Comments are closed.</p>
            </div>
          ) : (
            <div className="bg-muted/40 flex justify-center rounded-lg px-6 py-12">
              <p className="text-muted-foreground text-center">Comments coming soon.</p>
            </div>
          )}
        </div>
      </section>
    </>
  );
}
