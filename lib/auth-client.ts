import { env } from "@/lib/env";
import { createAuthClient } from "better-auth/react";

export const authClient = createAuthClient({
  baseURL: env.NEXT_PUBLIC_BASE_URL,
});

export const { signIn, signUp, useSession } = authClient;
