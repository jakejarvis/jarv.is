import { createEnv } from "@t3-oss/env-nextjs";
import { z } from "zod";

export const env = createEnv({
  server: {
    /**
     * Required. A random value used for authentication encryption.
     *
     * @see https://www.better-auth.com/docs/installation#set-environment-variables
     */
    AUTH_SECRET: z.string().min(1),

    /**
     * Required. The client ID from the GitHub Developer Portal for this site's OAuth App.
     *
     * @see https://www.better-auth.com/docs/authentication/github
     */
    AUTH_GITHUB_CLIENT_ID: z.string().min(1),

    /**
     * Required. A client secret from the GitHub Developer Portal for this site's OAuth App.
     *
     * @see https://www.better-auth.com/docs/authentication/github
     */
    AUTH_GITHUB_CLIENT_SECRET: z.string().min(1),

    /**
     * Required. Database connection string for a Postgres database.
     */
    DATABASE_URL: z.string().startsWith("postgresql://"),

    /**
     * Required. GitHub API token used for [/projects](../app/projects/page.tsx) grid. Only needs the `public_repo`
     * scope since we don't need/want to change anything, obviously.
     *
     * @see https://github.com/settings/tokens/new?scopes=public_repo
     */
    GITHUB_TOKEN: z.string().startsWith("ghp_").optional(),

    /**
     * Required. Uses Resend API to send contact form submissions via a [server action](../app/contact/action.ts). May
     * be set automatically by Vercel's Resend integration.
     *
     * @see https://resend.com/api-keys
     * @see https://vercel.com/integrations/resend
     */
    RESEND_API_KEY: z.string().startsWith("re_"),

    /**
     * Optional, but will throw a warning if unset. Use an approved domain (or subdomain) on the Resend account to send
     * submissions from. Sender's real email is passed via a Reply-To header, so setting this makes zero difference to
     * the user, only for deliverability success. Defaults to `onboarding@resend.dev`.
     *
     * @see https://resend.com/domains
     */
    RESEND_FROM_EMAIL: z.string().email().default("onboarding@resend.dev"),

    /** Required. The destination email for contact form submissions. */
    RESEND_TO_EMAIL: z.string().email(),
  },
  client: {
    /**
     * Optional. We try to make an educated guess for the most appropriate URL based on the current deployment's
     * environment and platform (if Vercel or Netlify), but you can override it by simply setting this manually. Must be
     * a fully-qualified URL if set beginning with `http(s)://`, and should not end with a trailing slash.
     *
     * @see https://nextjs.org/docs/app/api-reference/functions/generate-metadata#default-value
     */
    NEXT_PUBLIC_BASE_URL: z
      .string()
      .url()
      .default(
        ((): string =>
          (process.env.VERCEL || process.env.NEXT_PUBLIC_VERCEL
            ? process.env.NEXT_PUBLIC_VERCEL_ENV === "production"
              ? `https://${process.env.NEXT_PUBLIC_VERCEL_PROJECT_PRODUCTION_URL}`
              : process.env.NEXT_PUBLIC_VERCEL_ENV === "preview"
                ? `https://${process.env.NEXT_PUBLIC_VERCEL_BRANCH_URL}`
                : process.env.NEXT_PUBLIC_VERCEL_URL
                  ? `https://${process.env.NEXT_PUBLIC_VERCEL_URL}`
                  : undefined
            : undefined) ||
          (process.env.NETLIFY
            ? process.env.CONTEXT === "production"
              ? `${process.env.URL}`
              : process.env.DEPLOY_PRIME_URL
                ? `${process.env.DEPLOY_PRIME_URL}`
                : process.env.DEPLOY_URL
                  ? `${process.env.DEPLOY_URL}`
                  : undefined
            : undefined) ||
          `http://localhost:${process.env.PORT || 3000}`)()
      ),

    /**
     * Optional. Set this to override the best guess as to the environment the site is running in.
     */
    NEXT_PUBLIC_ENV: z
      .enum(["production", "development"])
      .default(
        ((): "production" | "development" =>
          (process.env.VERCEL && process.env.VERCEL_ENV === "production") ||
          (process.env.NETLIFY && process.env.CONTEXT === "production")
            ? "production"
            : "development")()
      ),

    /** Required. GitHub repository for the site in the format of `{username}/{repo}`. */
    NEXT_PUBLIC_GITHUB_REPO: z.string().refine((val) => val.includes("/"), {
      message: "Must be in the format {username}/{repo}",
    }),

    /** Required. GitHub username of the author, used to generate [/projects](../app/projects/page.tsx). */
    NEXT_PUBLIC_GITHUB_USERNAME: z.string().min(1),

    /**
     * Optional. Sets an `Onion-Location` header in responses to advertise a URL for the same page but hosted on a
     * hidden service on the Tor network. Browsers like Brave and Tor Browser will automatically pick this up and offer
     * to redirect users to it.
     *
     * @see https://community.torproject.org/onion-services/advanced/onion-location/
     */
    NEXT_PUBLIC_ONION_DOMAIN: z.string().endsWith(".onion").optional(),

    /**
     * Optional. Locale code to define the site's language in ISO-639 format. Defaults to `en-US`.
     *
     * @see https://www.loc.gov/standards/iso639-2/php/code_list.php
     */
    NEXT_PUBLIC_SITE_LOCALE: z.string().default("en-US"),
  },
  experimental__runtimeEnv: {
    NEXT_PUBLIC_BASE_URL: process.env.NEXT_PUBLIC_BASE_URL,
    NEXT_PUBLIC_ENV: process.env.NEXT_PUBLIC_ENV,
    NEXT_PUBLIC_GITHUB_REPO: process.env.NEXT_PUBLIC_GITHUB_REPO,
    NEXT_PUBLIC_GITHUB_USERNAME: process.env.NEXT_PUBLIC_GITHUB_USERNAME,
    NEXT_PUBLIC_ONION_DOMAIN: process.env.NEXT_PUBLIC_ONION_DOMAIN,
    NEXT_PUBLIC_SITE_LOCALE: process.env.NEXT_PUBLIC_SITE_LOCALE,
  },
  emptyStringAsUndefined: true,
  skipValidation: !!process.env.SKIP_ENV_VALIDATION,
});
