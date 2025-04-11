import { createEnv } from "@t3-oss/env-nextjs";
import { vercel } from "@t3-oss/env-nextjs/presets-valibot";
import * as v from "valibot";

export const env = createEnv({
  extends: [
    // NOTE: Some assumptions are sprinkled throughout the code that this site is being deployed on Vercel. If not, find
    // and replace `env.VERCEL_` (especially `VERCEL_ENV` and `VERCEL_PROJECT_PRODUCTION_URL`) with more appropriate
    // variables.
    vercel(),
  ],
  server: {
    /**
     * Required. GitHub API token used for [/projects](../app/projects/page.tsx) grid. Only needs the `public_repo`
     * scope since we don't need/want to change anything, obviously.
     *
     * @see https://github.com/settings/tokens/new?scopes=public_repo
     */
    GITHUB_TOKEN: v.optional(v.pipe(v.string(), v.startsWith("ghp_"))),

    /**
     * Required. Redis storage credentials for hit counter's [server component](../app/notes/[slug]/counter.tsx) and API
     * endpoint. Currently set automatically by Vercel's Upstash integration.
     *
     * @see https://upstash.com/docs/redis/sdks/ts/getstarted
     * @see https://vercel.com/marketplace/upstash
     */
    KV_REST_API_TOKEN: v.string(),
    /**
     * Required. Redis storage credentials for hit counter's [server component](../app/notes/[slug]/counter.tsx) and API
     * endpoint. Currently set automatically by Vercel's Upstash integration.
     *
     * @see https://upstash.com/docs/redis/sdks/ts/getstarted
     * @see https://vercel.com/marketplace/upstash
     */
    KV_REST_API_URL: v.pipe(v.string(), v.url(), v.startsWith("https://"), v.endsWith(".upstash.io")),

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
    RESEND_FROM_EMAIL: v.optional(v.pipe(v.string(), v.email()), "onboarding@resend.dev"),
    /**
     * Required. The destination email for contact form submissions.
     */
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
     * Optional. Enables comments on blog posts via GitHub discussions.
     *
     * @see https://giscus.app/
     */
    NEXT_PUBLIC_GISCUS_CATEGORY_ID: v.optional(v.string()),
    /**
     * Optional. Enables comments on blog posts via GitHub discussions.
     *
     * @see https://giscus.app/
     */
    NEXT_PUBLIC_GISCUS_REPO_ID: v.optional(v.string()),

    /**
     * Optional. Sets an `Onion-Location` header in responses to advertise a URL for the same page but hosted on a
     * hidden service on the Tor network. Browsers like Brave and Tor Browser will automatically pick this up and offer
     * to redirect users to it.
     *
     * @see https://community.torproject.org/onion-services/advanced/onion-location/
     */
    NEXT_PUBLIC_ONION_DOMAIN: v.optional(v.pipe(v.string(), v.endsWith(".onion"))),

    /**
     * Required. Site key must be prefixed with NEXT_PUBLIC_ since it is used to embed the captcha widget. Falls back to
     * testing keys if not set or in dev environment.
     *
     * @see https://developers.cloudflare.com/turnstile/troubleshooting/testing/
     */
    NEXT_PUBLIC_TURNSTILE_SITE_KEY: v.optional(v.string(), "XXXX.DUMMY.TOKEN.XXXX"),

    /**
     * Optional. The base URL of a self-hosted Umami instance (including https://) to proxy requests to. If the website
     * ID is set but this isn't, the managed Umami Cloud endpoint at https://cloud.umami.is is used.
     *
     * @see https://umami.is/docs/bypass-ad-blockers
     */
    NEXT_PUBLIC_UMAMI_URL: v.optional(v.pipe(v.string(), v.startsWith("https://"), v.url()), "https://cloud.umami.is"),
    /**
     * Optional. Enables privacy-friendly tracking via Umami, either managed or self-hosted. This ID can be found in the
     * dashboard under Settings > Websites > Edit > Details.
     *
     * @see https://umami.is/docs/collect-data
     */
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
