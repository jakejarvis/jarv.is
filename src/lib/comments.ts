import type * as schema from "@/lib/db/schema";

/** The public profile fields of a commenter (also used for the signed-in user in comment UI) */
export type CommentUser = Pick<typeof schema.user.$inferSelect, "id" | "name" | "image">;

export type CommentWithUser = typeof schema.comment.$inferSelect & {
  user: CommentUser;
  /** `content` (markdown) rendered to sanitized HTML on the server */
  contentHtml: string;
};
