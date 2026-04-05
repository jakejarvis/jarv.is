import { Link, createFileRoute, notFound } from "@tanstack/react-router";
import { allPosts } from "content-collections";
import {
  CalendarDaysIcon,
  EyeIcon,
  MessagesSquareIcon,
  SquarePenIcon,
  TagIcon,
} from "lucide-react";

import { CodeBlock } from "@/components/code-block";
import { CommentCount } from "@/components/comment-count";
import { Comments } from "@/components/comments/comments";
import { Image } from "@/components/image";
import { ImageDiff } from "@/components/image-diff";
import { CodePen } from "@/components/third-party/codepen";
import { Gist } from "@/components/third-party/gist";
import { Tweet } from "@/components/third-party/tweet";
import { YouTube } from "@/components/third-party/youtube";
import { Video } from "@/components/video";
import { ViewCounter } from "@/components/view-counter";
import authorConfig from "@/lib/config/author";
import { createHead } from "@/lib/head";
import { cn } from "@/lib/utils";

const BASE_URL = import.meta.env.VITE_BASE_URL || "https://jarv.is";
const GITHUB_REPO = import.meta.env.VITE_GITHUB_REPO || "jakejarvis/jarv.is";

// Eagerly import all MDX files at build time via Vite.
// @mdx-js/rollup compiles each .mdx to a real ES module (pure jsx() calls,
// no eval/new Function), so this is fully SSR-compatible in workerd.
const mdxModules = import.meta.glob<{
  default: React.ComponentType<{ components?: Record<string, unknown> }>;
}>("../../../notes/*/index.mdx", { eager: true });

const mdxComponents = {
  a: ({ href, rel, target, ...rest }: React.ComponentProps<"a">) => {
    const isExternal = typeof href === "string" && !["/", "#"].includes(href[0]);
    if (isExternal) {
      return (
        <a href={href} rel={rel || "noopener noreferrer"} target={target || "_blank"} {...rest} />
      );
    }
    return <Link to={href} rel={rel} target={target} {...rest} />;
  },
  pre: CodeBlock,
  img: ({ src, alt, className }: React.ComponentProps<"img">) => (
    <Image
      src={src || ""}
      alt={alt || ""}
      layout="fullWidth"
      className={cn(
        "mx-auto my-8 block rounded-sm",
        "[&+em]:text-muted-foreground [&+em]:-mt-4 [&+em]:block [&+em]:text-center [&+em]:text-[0.875em] [&+em]:leading-normal [&+em]:font-medium [&+em]:not-italic",
        className,
      )}
    />
  ),
  Video,
  ImageDiff,
  Tweet,
  YouTube,
  Gist,
  CodePen,
};

export const Route = createFileRoute("/notes/$slug")({
  loader: ({ params }) => {
    const post = allPosts.find((p) => p.slug === params.slug);
    if (!post) throw notFound();
    return { post };
  },
  head: ({ loaderData }) => {
    if (!loaderData) return {};
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
            url: `${BASE_URL}/api/og?slug=${post.slug}`,
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

  // Look up the pre-compiled MDX module from the eager glob
  const mdxPath = `../../../notes/${post.slug}/index.mdx`;
  const mdxModule = mdxModules[mdxPath];
  const MDXContent = mdxModule?.default;

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
                className="before:text-foreground/40 mx-px lowercase before:pr-0.5 before:content-['#'] first-of-type:ml-0 last-of-type:mr-0"
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

        <Link
          to="/notes/$slug"
          params={{ slug: post.slug }}
          hash="comments"
          className="text-foreground/70 flex flex-nowrap items-center gap-1.5 whitespace-nowrap hover:no-underline"
        >
          <MessagesSquareIcon className="inline size-3 shrink-0" aria-hidden="true" />
          <CommentCount slug={`notes/${post.slug}`} />
        </Link>

        <div className="flex min-w-14 flex-nowrap items-center gap-1.5 whitespace-nowrap">
          <EyeIcon className="inline size-3 shrink-0" aria-hidden="true" />
          <ViewCounter slug={`notes/${post.slug}`} />
        </div>
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

      <article
        className={cn(
          "prose prose-neutral dark:prose-invert prose-sm max-w-none",
          "prose-headings:font-semibold prose-headings:text-primary prose-headings:tracking-tight",
          "prose-p:text-foreground/90 prose-strong:text-primary prose-li:text-foreground/80",
          "prose-a:text-primary prose-a:font-medium prose-a:underline prose-a:underline-offset-4",
          "prose-blockquote:[&_p]:text-foreground/75 prose-blockquote:*:before:content-none prose-blockquote:*:after:content-none",
          "prose-code:bg-muted prose-code:text-foreground prose-code:px-1 prose-code:py-0.5 prose-code:rounded-sm prose-code:text-[0.9em] prose-code:before:content-none prose-code:after:content-none",
          "[&_table]:!border-[color:var(--border)] [&_td]:!border-[color:var(--border)] [&_th]:!border-[color:var(--border)]",
        )}
      >
        {MDXContent && <MDXContent components={mdxComponents} />}
      </article>

      <section id="comments" className="isolate my-8 w-full border-t-2 pt-8">
        <div className="mx-auto w-full max-w-3xl space-y-6">
          {post.noComments ? (
            <div className="bg-muted/40 flex justify-center rounded-lg px-6 py-12">
              <p className="text-center text-lg font-medium">Comments are closed.</p>
            </div>
          ) : (
            <Comments slug={`notes/${post.slug}`} />
          )}
        </div>
      </section>
    </>
  );
}
