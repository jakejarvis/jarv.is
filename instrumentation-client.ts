// This file configures the initialization of Sentry on the client.
// The added config here will be used whenever a users loads a page in their browser.
// https://docs.sentry.io/platforms/javascript/guides/nextjs/

import * as Sentry from "@sentry/nextjs";

Sentry.init({
  dsn: process.env.NEXT_PUBLIC_SENTRY_DSN || process.env.SENTRY_DSN,
  integrations: [
    Sentry.replayIntegration({
      networkDetailAllowUrls: [process.env.NEXT_PUBLIC_VERCEL_PROJECT_PRODUCTION_URL!],
      networkRequestHeaders: ["referer", "origin", "user-agent", "x-upstream-proxy"],
      networkResponseHeaders: [
        "location",
        "x-matched-path",
        "x-nextjs-prerender",
        "x-vercel-cache",
        "x-vercel-id",
        "x-vercel-error",
        "x-rewrite-url",
        "x-got-milk",
      ],
    }),
  ],
  tracesSampleRate: 1.0,
  replaysSessionSampleRate: 0,
  replaysOnErrorSampleRate: 1.0,
  debug: false,
});
