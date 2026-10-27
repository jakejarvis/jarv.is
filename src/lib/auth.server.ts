import "@tanstack/react-start/server-only";
import { drizzleAdapter } from "@better-auth/drizzle-adapter/relations-v2";
import { dash } from "@better-auth/infra";
import { waitUntil } from "@vercel/functions";
import { type BetterAuthOptions, betterAuth } from "better-auth/minimal";
import { tanstackStartCookies } from "better-auth/tanstack-start";

import { db } from "@/lib/db";
import * as schema from "@/lib/db/schema";

export const auth = betterAuth({
  appName: "jarv.is",
  baseURL: import.meta.env.VITE_BASE_URL,
  database: drizzleAdapter(db, {
    provider: "pg",
    schema,
  }),
  // tanstackStartCookies() must be last
  plugins: [dash(), tanstackStartCookies()],
  // names and avatars come from GitHub at sign-up; don't let users rename themselves (e.g. to impersonate someone)
  disabledPaths: ["/update-user"],
  socialProviders: {
    github: {
      clientId: process.env.GITHUB_CLIENT_ID!,
      clientSecret: process.env.GITHUB_CLIENT_SECRET!,
      mapProfileToUser: (profile) => ({
        name: profile.login,
        email: profile.email,
        emailVerified: true,
        image: profile.avatar_url,
      }),
    },
  },
  advanced: {
    database: {
      joins: true,
    },
    backgroundTasks: {
      handler: waitUntil,
    },
    ipAddress: {
      ipAddressHeaders: ["x-vercel-forwarded-for", "x-forwarded-for"],
    },
  },
} satisfies BetterAuthOptions);
