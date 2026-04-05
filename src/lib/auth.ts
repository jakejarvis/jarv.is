import { type BetterAuthOptions, betterAuth } from "better-auth";
import { drizzleAdapter } from "better-auth/adapters/drizzle";
import { tanstackStartCookies } from "better-auth/tanstack-start";

import { db } from "@/lib/db";
import * as schema from "@/lib/db/schema";

export const auth = betterAuth({
  baseURL: process.env.VITE_BASE_URL,
  database: drizzleAdapter(db, {
    provider: "pg",
    schema,
  }),
  socialProviders: {
    github: {
      clientId: process.env.AUTH_GITHUB_CLIENT_ID,
      clientSecret: process.env.AUTH_GITHUB_CLIENT_SECRET,
      mapProfileToUser: (profile) => ({
        name: profile.login,
        email: profile.email,
        emailVerified: true,
        image: profile.avatar_url,
      }),
    },
  },
  plugins: [tanstackStartCookies()],
} satisfies BetterAuthOptions);
