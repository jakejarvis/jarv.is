import type { Database } from "./database";

export type Comment = Database["public"]["Tables"]["comments"]["Row"];
export type User = Database["public"]["Tables"]["users"]["Row"];

export interface CommentWithUser extends Comment {
  user: User;
}
