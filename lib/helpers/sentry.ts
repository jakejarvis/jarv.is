import * as Sentry from "@sentry/node";
import "@sentry/tracing";
import { BUILD_ENV } from "../config/constants";

const IsomorphicSentry = () => {
  // https://docs.sentry.io/platforms/node/configuration/options/
  Sentry.init({
    dsn: process.env.SENTRY_DSN || process.env.NEXT_PUBLIC_SENTRY_DSN || "",
    environment: BUILD_ENV,
    tracesSampleRate: 1.0,
  });

  return Sentry;
};

export const logServerError = async (error: unknown) => {
  try {
    const sentryInstance = IsomorphicSentry();

    // log error to sentry
    sentryInstance.captureException(error);

    // give it 2 seconds to finish sending:
    // https://docs.sentry.io/platforms/node/configuration/draining/
    await sentryInstance.flush(2000);
  } catch (sentryError) {
    // cue inception bong
    console.error("Encountered an error logging an error... We are doomed.", sentryError);
  }

  // also log the error normally to the Vercel console; will get picked up by log drain
  console.error(error);

  // we really don't want to return *any* error from logging an error, so just keep it on the dl
  return Promise.resolve();
};

export default IsomorphicSentry;
