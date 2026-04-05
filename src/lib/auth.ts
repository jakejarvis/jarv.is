import { betterAuth } from "better-auth";
import { drizzleAdapter } from "better-auth/adapters/drizzle";
import { tanstackStartCookies } from "better-auth/tanstack-start";
import { env } from "cloudflare:workers";

import { getDb } from "@/lib/db";
import * as schema from "@/lib/db/schema";

const createAuth = () =>
  betterAuth({
    baseURL: import.meta.env.VITE_BASE_URL,
    database: drizzleAdapter(getDb(), {
      provider: "sqlite",
      schema,
    }),
    socialProviders: {
      github: {
        clientId: env.AUTH_GITHUB_CLIENT_ID,
        clientSecret: env.AUTH_GITHUB_CLIENT_SECRET,
        mapProfileToUser: (profile) => ({
          name: profile.login,
          email: profile.email,
          emailVerified: true,
          image: profile.avatar_url,
        }),
      },
    },
    plugins: [tanstackStartCookies()],
  });

let _auth: ReturnType<typeof createAuth>;

export const getAuth = () => {
  if (!_auth) {
    _auth = createAuth();
  }
  return _auth;
};
