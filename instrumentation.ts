import * as Sentry from "@sentry/nextjs";

export const onRequestError = Sentry.captureRequestError;

export const register = () => {
  Sentry.init({
    dsn: process.env.NEXT_PUBLIC_SENTRY_DSN || process.env.SENTRY_DSN,
    environment: process.env.NEXT_PUBLIC_VERCEL_ENV,
    integrations: [Sentry.captureConsoleIntegration()],
    tracesSampleRate: 1.0,
    // https://docs.sentry.io/platforms/javascript/guides/nextjs/configuration/options/#normalizeDepth
    normalizeDepth: 5,
  });

  if (process.env.NEXT_RUNTIME === "nodejs") {
    // filesystem is only available in nodejs runtime
    // https://docs.sentry.io/platforms/javascript/guides/nextjs/configuration/integrations/fs/
    Sentry.addIntegration(
      Sentry.fsIntegration({
        recordFilePaths: true,
      })
    );
  }
};
