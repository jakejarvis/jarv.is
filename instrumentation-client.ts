import * as Sentry from "@sentry/nextjs";

Sentry.init({
  dsn: process.env.NEXT_PUBLIC_SENTRY_DSN,
  integrations: [Sentry.browserTracingIntegration(), Sentry.httpClientIntegration()],
  tracesSampleRate: 1.0,
});
