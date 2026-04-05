import { type BetterAuthOptions, betterAuth } from "better-auth";
import { drizzleAdapter } from "better-auth/adapters/drizzle";
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
      // biome-ignore lint/style/noNonNullAssertion: expected to be set in env
      clientId: process.env.AUTH_GITHUB_CLIENT_ID!,
      // biome-ignore lint/style/noNonNullAssertion: expected to be set in env
      clientSecret: process.env.AUTH_GITHUB_CLIENT_SECRET!,
      mapProfileToUser: (profile) => ({
        name: profile.login,
        email: profile.email,
        emailVerified: true,
        image: profile.avatar_url,
      }),
    },
  },
} satisfies BetterAuthOptions);
