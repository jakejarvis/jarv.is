import * as Sentry from "@sentry/node";
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import * as Tracing from "@sentry/tracing";

// https://docs.sentry.io/platforms/node/configuration/options/
Sentry.init({
  dsn: process.env.SENTRY_DSN || process.env.NEXT_PUBLIC_SENTRY_DSN || "",
  environment: process.env.NODE_ENV || process.env.VERCEL_ENV || process.env.NEXT_PUBLIC_VERCEL_ENV || "",
  tracesSampleRate: 1.0,
});

export const logServerError = async (error: string | Error) => {
  try {
    // log error to sentry
    Sentry.captureException(error);
    // give it 2 seconds to finish sending:
    // https://docs.sentry.io/platforms/node/configuration/draining/
    await Sentry.flush(2000);
  } catch (sentryError) {
    // cue inception bong
    console.error("Encountered an error logging an error... We are doomed.", sentryError);
  }

  // also log the error normally to the Vercel console; will get picked up by log drain
  console.error(error);

  // we really don't want to return *any* error from logging an error, so just keep it on the dl
  return true;
};

export default Sentry;
