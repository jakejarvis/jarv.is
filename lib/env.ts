import { createEnv } from "@t3-oss/env-nextjs";
import * as v from "valibot";

export const env = createEnv({
  server: {
    /**
     * Required. A random value used for authentication encryption.
     *
     * @see https://www.better-auth.com/docs/installation#set-environment-variables
     */
    AUTH_SECRET: v.string(),

    /**
     * Required. The client ID from the GitHub Developer Portal for this site's OAuth App.
     *
     * @see https://www.better-auth.com/docs/authentication/github
     */
    AUTH_GITHUB_CLIENT_ID: v.string(),

    /**
     * Required. A client secret from the GitHub Developer Portal for this site's OAuth App.
     *
     * @see https://www.better-auth.com/docs/authentication/github
     */
    AUTH_GITHUB_CLIENT_SECRET: v.string(),

    /**
     * Required. Database connection string for a Postgres database. May be set automatically by Vercel's Neon
     * integration.
     *
     * @see https://vercel.com/integrations/neon
     */
    DATABASE_URL: v.pipe(v.string(), v.startsWith("postgres://")),

    /**
     * Required. GitHub API token used for [/projects](../app/projects/page.tsx) grid. Only needs the `public_repo`
     * scope since we don't need/want to change anything, obviously.
     *
     * @see https://github.com/settings/tokens/new?scopes=public_repo
     */
    GITHUB_TOKEN: v.optional(v.pipe(v.string(), v.startsWith("ghp_"))),

    /**
     * Required. Uses Resend API to send contact form submissions via a [server action](../app/contact/action.ts). May
     * be set automatically by Vercel's Resend integration.
     *
     * @see https://resend.com/api-keys
     * @see https://vercel.com/integrations/resend
     */
    RESEND_API_KEY: v.pipe(v.string(), v.startsWith("re_")),

    /**
     * Optional, but will throw a warning if unset. Use an approved domain (or subdomain) on the Resend account to send
     * submissions from. Sender's real email is passed via a Reply-To header, so setting this makes zero difference to
     * the user, only for deliverability success. Defaults to `onboarding@resend.dev`.
     *
     * @see https://resend.com/domains
     */
    RESEND_FROM_EMAIL: v.fallback(v.pipe(v.string(), v.email()), "onboarding@resend.dev"),

    /** Required. The destination email for contact form submissions. */
    RESEND_TO_EMAIL: v.pipe(v.string(), v.email()),

    /**
     * Required. Secret for Cloudflare `siteverify` API to validate a form's turnstile result on the backend.
     *
     * @see https://developers.cloudflare.com/turnstile/get-started/server-side-validation/
     */
    TURNSTILE_SECRET_KEY: v.optional(v.string(), "1x0000000000000000000000000000000AA"),
  },
  client: {
    /**
     * Optional. We try to make an educated guess for the most appropriate URL based on the current deployment's
     * environment and platform (if Vercel or Netlify), but you can override it by simply setting this manually. Must be
     * a fully-qualified URL if set beginning with `http(s)://`, and should not end with a trailing slash.
     *
     * @see https://nextjs.org/docs/app/api-reference/functions/generate-metadata#default-value
     */
    NEXT_PUBLIC_BASE_URL: v.fallback(
      v.pipe(v.string(), v.url()),
      () =>
        // Vercel: https://vercel.com/docs/environment-variables/system-environment-variables
        (process.env.VERCEL
          ? process.env.VERCEL_ENV === "production"
            ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
            : process.env.VERCEL_ENV === "preview"
              ? `https://${process.env.VERCEL_BRANCH_URL}`
              : process.env.VERCEL_URL
                ? `https://${process.env.VERCEL_URL}`
                : undefined
          : undefined) ||
        // Netlify: https://docs.netlify.com/configure-builds/environment-variables/#read-only-variables
        (process.env.NETLIFY
          ? process.env.CONTEXT === "production"
            ? `${process.env.URL}`
            : process.env.DEPLOY_PRIME_URL
              ? `${process.env.DEPLOY_PRIME_URL}`
              : process.env.DEPLOY_URL
                ? `${process.env.DEPLOY_URL}`
                : undefined
          : undefined) ||
        // next dev
        `http://localhost:${process.env.PORT || 3000}`
    ),

    /**
     * Optional. Set this to override the best guess as to the environment the site is running in.
     */
    NEXT_PUBLIC_ENV: v.fallback(v.picklist(["production", "development"]), () =>
      (process.env.VERCEL && process.env.VERCEL_ENV === "production") ||
      (process.env.NETLIFY && process.env.CONTEXT === "production")
        ? "production"
        : "development"
    ),

    /** Required. GitHub repository for the site in the format of `{username}/{repo}`. */
    NEXT_PUBLIC_GITHUB_REPO: v.pipe(v.string(), v.includes("/")),

    /** Required. GitHub username of the author, used to generate [/projects](../app/projects/page.tsx). */
    NEXT_PUBLIC_GITHUB_USERNAME: v.string(),

    /**
     * Optional. Sets an `Onion-Location` header in responses to advertise a URL for the same page but hosted on a
     * hidden service on the Tor network. Browsers like Brave and Tor Browser will automatically pick this up and offer
     * to redirect users to it.
     *
     * @see https://community.torproject.org/onion-services/advanced/onion-location/
     */
    NEXT_PUBLIC_ONION_DOMAIN: v.optional(v.pipe(v.string(), v.endsWith(".onion"))),

    /**
     * Optional. Locale code to define the site's language in ISO-639 format. Defaults to `en-US`.
     *
     * @see https://www.loc.gov/standards/iso639-2/php/code_list.php
     */
    NEXT_PUBLIC_SITE_LOCALE: v.optional(v.string(), "en-US"),

    /**
     * Optional. Consistent timezone for the site. Doesn't really matter what it is, as long as it's the same everywhere
     * to avoid hydration complaints. Defaults to `America/New_York`.
     *
     * @see https://en.wikipedia.org/wiki/List_of_tz_database_time_zones#List
     */
    NEXT_PUBLIC_SITE_TZ: v.optional(v.string(), "America/New_York"),

    /**
     * Required. Site key must be prefixed with NEXT_PUBLIC_ since it is used to embed the captcha widget. Falls back to
     * testing keys if not set or in dev environment.
     *
     * @see https://developers.cloudflare.com/turnstile/troubleshooting/testing/
     */
    NEXT_PUBLIC_TURNSTILE_SITE_KEY: v.optional(v.string(), "1x00000000000000000000AA"),
  },
  experimental__runtimeEnv: {
    NEXT_PUBLIC_BASE_URL: process.env.NEXT_PUBLIC_BASE_URL,
    NEXT_PUBLIC_ENV: process.env.NEXT_PUBLIC_ENV,
    NEXT_PUBLIC_GITHUB_REPO: process.env.NEXT_PUBLIC_GITHUB_REPO,
    NEXT_PUBLIC_GITHUB_USERNAME: process.env.NEXT_PUBLIC_GITHUB_USERNAME,
    NEXT_PUBLIC_ONION_DOMAIN: process.env.NEXT_PUBLIC_ONION_DOMAIN,
    NEXT_PUBLIC_SITE_LOCALE: process.env.NEXT_PUBLIC_SITE_LOCALE,
    NEXT_PUBLIC_SITE_TZ: process.env.NEXT_PUBLIC_SITE_TZ,
    NEXT_PUBLIC_TURNSTILE_SITE_KEY: process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY,
  },
  emptyStringAsUndefined: true,
  skipValidation: !!process.env.SKIP_ENV_VALIDATION,
});
