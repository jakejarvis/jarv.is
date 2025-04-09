import { createEnv } from "@t3-oss/env-nextjs";
import { vercel } from "@t3-oss/env-nextjs/presets-valibot";
import * as v from "valibot";

export const env = createEnv({
  extends: [vercel()],
  server: {
    GITHUB_TOKEN: v.optional(v.pipe(v.string(), v.startsWith("ghp_"))),
    KV_REST_API_TOKEN: v.string(),
    KV_REST_API_URL: v.pipe(v.string(), v.url(), v.startsWith("https://"), v.endsWith(".upstash.io")),
    RESEND_API_KEY: v.pipe(v.string(), v.startsWith("re_")),
    RESEND_FROM_EMAIL: v.optional(v.pipe(v.string(), v.email())),
    RESEND_TO_EMAIL: v.pipe(v.string(), v.email()),
    TURNSTILE_SECRET_KEY: v.optional(v.string()),
  },
  client: {
    NEXT_PUBLIC_GISCUS_CATEGORY_ID: v.optional(v.string()),
    NEXT_PUBLIC_GISCUS_REPO_ID: v.optional(v.string()),
    NEXT_PUBLIC_ONION_DOMAIN: v.optional(v.pipe(v.string(), v.endsWith(".onion"))),
    NEXT_PUBLIC_TURNSTILE_SITE_KEY: v.optional(v.string()),
    NEXT_PUBLIC_UMAMI_URL: v.optional(v.pipe(v.string(), v.url())),
    NEXT_PUBLIC_UMAMI_WEBSITE_ID: v.optional(v.string()),
  },
  experimental__runtimeEnv: {
    NEXT_PUBLIC_GISCUS_CATEGORY_ID: process.env.NEXT_PUBLIC_GISCUS_CATEGORY_ID,
    NEXT_PUBLIC_GISCUS_REPO_ID: process.env.NEXT_PUBLIC_GISCUS_REPO_ID,
    NEXT_PUBLIC_ONION_DOMAIN: process.env.NEXT_PUBLIC_ONION_DOMAIN,
    NEXT_PUBLIC_TURNSTILE_SITE_KEY: process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY,
    NEXT_PUBLIC_UMAMI_URL: process.env.NEXT_PUBLIC_UMAMI_URL,
    NEXT_PUBLIC_UMAMI_WEBSITE_ID: process.env.NEXT_PUBLIC_UMAMI_WEBSITE_ID,
  },
  emptyStringAsUndefined: true,
  skipValidation: !!process.env.SKIP_ENV_VALIDATION,
});
