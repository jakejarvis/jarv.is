"use server";

import { headers } from "next/headers";
import { revalidatePath } from "next/cache";
import { eq, desc, asc, sql, and } from "drizzle-orm";
import { db } from "@/lib/db";
import * as schema from "@/lib/db/schema";
import { auth } from "@/lib/auth";

export type CommentWithUser = typeof schema.comment.$inferSelect & {
  user: Pick<typeof schema.user.$inferSelect, "id" | "name" | "image">;
  // upvotes and downvotes are already part of schema.comment.$inferSelect
};

export type SortByType = "newest" | "oldest" | "mostLiked";

export const getComments = async (pageSlug: string, sortBy: SortByType = "newest"): Promise<CommentWithUser[]> => {
  try {
    let orderByClause;
    switch (sortBy) {
      case "oldest":
        orderByClause = asc(schema.comment.createdAt);
        break;
      case "mostLiked":
        // Sort by net upvotes (upvotes - downvotes)
        orderByClause = desc(sql`${schema.comment.upvotes} - ${schema.comment.downvotes}`);
        break;
      case "newest":
      default:
        orderByClause = desc(schema.comment.createdAt);
        break;
    }

    // Fetch all comments for the page with user details
    const commentsWithUsers = await db
      .select({
        // explicitly list fields from comment to ensure upvotes/downvotes are included
        id: schema.comment.id,
        content: schema.comment.content,
        pageSlug: schema.comment.pageSlug,
        parentId: schema.comment.parentId,
        userId: schema.comment.userId,
        createdAt: schema.comment.createdAt,
        updatedAt: schema.comment.updatedAt,
        upvotes: schema.comment.upvotes,
        downvotes: schema.comment.downvotes,
        user: { // select specific user fields
          id: schema.user.id,
          name: schema.user.name,
          image: schema.user.image,
        }
      })
      .from(schema.comment)
      .innerJoin(schema.user, eq(schema.comment.userId, schema.user.id))
      .where(eq(schema.comment.pageSlug, pageSlug))
      .orderBy(orderByClause);

    // The structure is now flat due to explicit select, adjust mapping if necessary
    // However, the explicit select above shapes it correctly with a nested user object.
    return commentsWithUsers as CommentWithUser[];
  } catch (error) {
    console.error(`[server/comments] error fetching comments (slug: ${pageSlug}, sort: ${sortBy}):`, error);
    throw new Error("Failed to fetch comments");
  }
};

// Define the type for voteType based on the enum
export type VoteType = typeof schema.voteTypeEnum.enumValues[number];

export interface AddCommentVoteData {
  commentId: string;
  voteType: VoteType;
  userId?: string; // User ID if logged in
  pageSlug: string; // pageSlug for revalidation
}

export interface AddCommentVoteResponse {
  success: boolean;
  message?: string;
  upvotes?: number;
  downvotes?: number;
}

export const addCommentVote = async (data: AddCommentVoteData): Promise<AddCommentVoteResponse> => {
  const { commentId, voteType, userId, pageSlug } = data;

  const headerList = headers();
  const ipAddress = (headerList.get("x-forwarded-for") ?? "127.0.0.1").split(",")[0].trim();

  const session = await auth.api.getSession({ headers: headerList });

  // Validate userId if provided
  if (userId && (!session || session.user?.id !== userId)) {
    return { success: false, message: "User ID mismatch or not authenticated." };
  }
  const effectiveUserId = session?.user?.id; // Use session's user ID if available

  try {
    const result = await db.transaction(async (tx) => {
      // Check for existing comment
      const comment = await tx
        .select({ id: schema.comment.id, upvotes: schema.comment.upvotes, downvotes: schema.comment.downvotes })
        .from(schema.comment)
        .where(eq(schema.comment.id, commentId))
        .then((res) => res[0]);

      if (!comment) {
        throw new Error("Comment not found");
      }

      // Determine query conditions for existing vote
      const voteConditions = [eq(schema.commentVote.commentId, commentId)];
      if (effectiveUserId) {
        voteConditions.push(eq(schema.commentVote.userId, effectiveUserId));
      } else {
        // For anonymous users, ensure userId is null in the vote table and match IP
        voteConditions.push(sql`${schema.commentVote.userId} IS NULL`);
        voteConditions.push(eq(schema.commentVote.ipAddress, ipAddress));
      }

      const existingVote = await tx
        .select()
        .from(schema.commentVote)
        .where(and(...voteConditions))
        .then((res) => res[0]);

      let upvoteChange = 0;
      let downvoteChange = 0;

      if (existingVote) {
        if (existingVote.voteType === voteType) {
          // Same vote type, so toggle off (delete the vote)
          await tx.delete(schema.commentVote).where(eq(schema.commentVote.id, existingVote.id));
          if (voteType === "upvote") upvoteChange = -1;
          else downvoteChange = -1;
        } else {
          // Different vote type, so update the vote
          await tx
            .update(schema.commentVote)
            .set({ voteType: voteType, updatedAt: new Date(), ipAddress: effectiveUserId ? null : ipAddress, userId: effectiveUserId }) // ensure ip/userId is updated if user logs in/out
            .where(eq(schema.commentVote.id, existingVote.id));
          if (voteType === "upvote") {
            upvoteChange = 1;
            downvoteChange = -1; // previous was downvote
          } else {
            upvoteChange = -1; // previous was upvote
            downvoteChange = 1;
          }
        }
      } else {
        // No existing vote, so insert a new one
        await tx.insert(schema.commentVote).values({
          commentId,
          voteType,
          userId: effectiveUserId,
          ipAddress: effectiveUserId ? null : ipAddress, // Store IP only for anonymous
        });
        if (voteType === "upvote") upvoteChange = 1;
        else downvoteChange = 1;
      }

      // Update comment upvotes/downvotes if there's any change
      if (upvoteChange !== 0 || downvoteChange !== 0) {
        await tx
          .update(schema.comment)
          .set({
            upvotes: sql`${schema.comment.upvotes} + ${upvoteChange}`,
            downvotes: sql`${schema.comment.downvotes} + ${downvoteChange}`,
          })
          .where(eq(schema.comment.id, commentId));
      }
      
      // Fetch the updated comment counts
      const updatedComment = await tx
        .select({ upvotes: schema.comment.upvotes, downvotes: schema.comment.downvotes })
        .from(schema.comment)
        .where(eq(schema.comment.id, commentId))
        .then(res => res[0]);

      return {
        success: true,
        upvotes: updatedComment?.upvotes,
        downvotes: updatedComment?.downvotes,
      };
    });

    if (result.success) {
      revalidatePath(`/${pageSlug}`); // Revalidate the page
      revalidatePath(`/`); // Also revalidate home page if it lists comments or something similar
    }
    return result;

  } catch (error: any) {
    console.error("[server/comments] error in addCommentVote:", error);
    return { success: false, message: error.message || "Failed to process vote." };
  }
};

export const createComment = async (data: { content: string; pageSlug: string; parentId?: string }) => {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session || !session.user) {
    throw new Error("You must be logged in to comment");
  }

  try {
    // Insert the comment
    await db.insert(schema.comment).values({
      content: data.content,
      pageSlug: data.pageSlug,
      parentId: data.parentId || null,
      userId: session.user.id,
    });

    // Revalidate the page to show the new comment
    revalidatePath(`/${data.pageSlug}`);
  } catch (error) {
    console.error("[server/comments] error creating comment:", error);
    throw new Error("Failed to create comment");
  }
};

export const updateComment = async (commentId: string, content: string) => {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session || !session.user) {
    throw new Error("You must be logged in to update a comment");
  }

  try {
    // Get the comment to verify ownership
    const comment = await db
      .select({ userId: schema.comment.userId, pageSlug: schema.comment.pageSlug })
      .from(schema.comment)
      .where(eq(schema.comment.id, commentId))
      .then((results) => results[0]);

    if (!comment) {
      throw new Error("Comment not found");
    }

    // Verify ownership
    if (comment.userId !== session.user.id) {
      throw new Error("You can only edit your own comments");
    }

    // Update the comment
    await db
      .update(schema.comment)
      .set({
        content,
        updatedAt: new Date(),
      })
      .where(eq(schema.comment.id, commentId));

    // Revalidate the page to show the updated comment
    revalidatePath(`/${comment.pageSlug}`);
  } catch (error) {
    console.error("[server/comments] error updating comment:", error);
    throw new Error("Failed to update comment");
  }
};

export const deleteComment = async (commentId: string) => {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session || !session.user) {
    throw new Error("You must be logged in to delete a comment");
  }

  try {
    // Get the comment to verify ownership and get the page_slug for revalidation
    const comment = await db
      .select({ userId: schema.comment.userId, pageSlug: schema.comment.pageSlug })
      .from(schema.comment)
      .where(eq(schema.comment.id, commentId))
      .then((results) => results[0]);

    if (!comment) {
      throw new Error("Comment not found");
    }

    // Verify ownership
    if (comment.userId !== session.user.id) {
      throw new Error("You can only delete your own comments");
    }

    // Delete the comment
    await db.delete(schema.comment).where(eq(schema.comment.id, commentId));

    // Revalidate the page to update the comments list
    revalidatePath(`/${comment.pageSlug}`);
  } catch (error) {
    console.error("[server/comments] error deleting comment:", error);
    throw new Error("Failed to delete comment");
  }
};
