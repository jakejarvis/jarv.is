/* eslint-disable camelcase */
"use server";

import { revalidatePath } from "next/cache";
import { createClient } from "@/lib/supabase/server";

export const createComment = async (data: { content: string; page_slug: string; parent_id?: string }) => {
  const supabase = await createClient();

  // Get the current user
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    throw new Error("You must be logged in to comment");
  }

  // Insert the comment
  const { error } = await supabase.from("comments").insert({
    content: data.content,
    page_slug: data.page_slug,
    parent_id: data.parent_id || null,
    user_id: user.id,
  });

  if (error) {
    console.error("Error creating comment:", error);
    throw new Error("Failed to create comment");
  }

  // Revalidate the page to show the new comment
  revalidatePath(`/${data.page_slug}`);
};

export const updateComment = async (commentId: string, content: string) => {
  const supabase = await createClient();

  // Get the current user
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    throw new Error("You must be logged in to update a comment");
  }

  // Get the comment to verify ownership
  const { data: comment, error: fetchError } = await supabase
    .from("comments")
    .select("user_id, page_slug")
    .eq("id", commentId)
    .single();

  if (fetchError || !comment) {
    console.error("Error fetching comment:", fetchError);
    throw new Error("Comment not found");
  }

  // Verify ownership
  if (comment.user_id !== user.id) {
    throw new Error("You can only edit your own comments");
  }

  // Update the comment
  const { error } = await supabase
    .from("comments")
    .update({ content, updated_at: new Date().toISOString() })
    .eq("id", commentId);

  if (error) {
    console.error("Error updating comment:", error);
    throw new Error("Failed to update comment");
  }

  // Revalidate the page to show the updated comment
  revalidatePath(`/${comment.page_slug}`);
};

export const deleteComment = async (commentId: string) => {
  const supabase = await createClient();

  // Get the current user
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    throw new Error("You must be logged in to delete a comment");
  }

  // Get the comment to verify ownership and get the page_slug for revalidation
  const { data: comment, error: fetchError } = await supabase
    .from("comments")
    .select("user_id, page_slug")
    .eq("id", commentId)
    .single();

  if (fetchError || !comment) {
    console.error("Error fetching comment:", fetchError);
    throw new Error("Comment not found");
  }

  // Verify ownership
  if (comment.user_id !== user.id) {
    throw new Error("You can only delete your own comments");
  }

  // Delete the comment
  const { error } = await supabase.from("comments").delete().eq("id", commentId);

  if (error) {
    console.error("Error deleting comment:", error);
    throw new Error("Failed to delete comment");
  }

  // Revalidate the page to update the comments list
  revalidatePath(`/${comment.page_slug}`);
};
