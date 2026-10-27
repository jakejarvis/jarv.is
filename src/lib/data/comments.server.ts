import "@tanstack/react-start/server-only";
import { desc, eq } from "drizzle-orm";
import { defaultSchema } from "rehype-sanitize";
import { unified } from "unified";

import type { CommentWithUser } from "@/lib/comments";
import { db } from "@/lib/db";
import * as schema from "@/lib/db/schema";
import { rehypeExternalLinks, rehypeSanitize, rehypeStringify } from "@/lib/rehype";
import { remarkGfm, remarkParse, remarkRehype, remarkSmartypants } from "@/lib/remark";

/** Renders a comment's markdown to HTML, allowing only basic inline formatting, links and code. */
const renderCommentMarkdown = async (content: string): Promise<string> => {
  const file = await unified()
    .use(remarkParse)
    .use(remarkGfm)
    .use(remarkSmartypants)
    .use(remarkRehype)
    .use(rehypeSanitize, {
      ...defaultSchema,
      tagNames: ["p", "a", "em", "strong", "code", "pre", "blockquote", "del"],
    })
    .use(rehypeExternalLinks, { target: "_blank", rel: ["noopener", "noreferrer", "nofollow"] })
    .use(rehypeStringify)
    .process(content);

  return String(file);
};

/**
 * Retrieves all comments for a given slug, newest first, with each author's public profile fields. Throws on failure.
 */
export const getComments = async (pageSlug: string): Promise<CommentWithUser[]> => {
  // Fetch all comments for the page with user details
  const commentsWithUsers = await db
    .select()
    .from(schema.comment)
    .innerJoin(schema.user, eq(schema.comment.userId, schema.user.id))
    .where(eq(schema.comment.pageSlug, pageSlug))
    .orderBy(desc(schema.comment.createdAt));

  return Promise.all(
    commentsWithUsers.map(async ({ comment, user }) =>
      Object.assign(comment, {
        contentHtml: await renderCommentMarkdown(comment.content),
        user: {
          // we're namely worried about keeping the user's email private here, but nothing sensitive is stored in the db
          id: user.id,
          name: user.name,
          image: user.image,
        },
      }),
    ),
  );
};
