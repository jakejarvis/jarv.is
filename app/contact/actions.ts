"use server";

import { headers } from "next/headers";
import * as v from "valibot";
import { Resend } from "resend";
import * as Sentry from "@sentry/nextjs";
import * as config from "../../lib/config";

const ContactSchema = v.object({
  // TODO: replace duplicate error messages with v.message() when released. see:
  // https://valibot.dev/api/message/
  // https://github.com/fabian-hiller/valibot/blob/main/library/src/methods/message/message.ts
  name: v.pipe(v.string("Your name is required."), v.trim(), v.nonEmpty("Your name is required.")),
  email: v.pipe(
    v.string("Your email address is required."),
    v.trim(),
    v.nonEmpty("Your email address is required."),
    v.email("Invalid email address.")
  ),
  message: v.pipe(
    v.string("A message is required."),
    v.trim(),
    v.nonEmpty("A message is required."),
    v.minLength(10, "Your message must be at least 10 characters.")
  ),
  "cf-turnstile-response": v.pipe(
    // token wasn't submitted at _all_, most likely a direct POST request by a spam bot
    v.string("Shoo, bot."),
    // form submitted properly but token was missing, might be a forgetful human
    v.nonEmpty("Just do the stinkin CAPTCHA, human! 🤖"),
    // very rudimentary length check based on Cloudflare's docs
    // https://developers.cloudflare.com/turnstile/troubleshooting/testing/
    v.minLength("XXXX.DUMMY.TOKEN.XXXX".length),
    // "A Turnstile token can have up to 2048 characters."
    // https://developers.cloudflare.com/turnstile/get-started/server-side-validation/
    v.maxLength(2048),
    v.readonly()
  ),
});

export type ContactInput = v.InferInput<typeof ContactSchema>;

export type ContactState = {
  success: boolean;
  message: string;
  errors?: v.FlatErrors<typeof ContactSchema>["nested"];
};

export const sendMessage = async (prevState: ContactState, formData: FormData): Promise<ContactState> => {
  return await Sentry.withServerActionInstrumentation(
    "sendMessage",
    {
      formData,
      headers: headers(),
      recordResponse: true,
    },
    async () => {
      try {
        const data = v.safeParse(ContactSchema, Object.fromEntries(formData));

        if (!data.success) {
          return {
            success: false,
            message: "Please make sure all fields are filled in.",
            errors: v.flatten(data.issues).nested,
          };
        }

        // validate captcha
        const turnstileResponse = await fetch("https://challenges.cloudflare.com/turnstile/v0/siteverify", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            secret: process.env.TURNSTILE_SECRET_KEY || "1x0000000000000000000000000000000AA",
            response: data.output["cf-turnstile-response"],
            remoteip: (await headers()).get("x-forwarded-for") || "",
          }),
          cache: "no-store",
          signal: AbortSignal.timeout(5000), // 5 second timeout
        });

        if (!turnstileResponse || !turnstileResponse.ok) {
          throw new Error(`[contact form] turnstile validation failed: ${turnstileResponse.status}`);
        }

        const turnstileData = (await turnstileResponse.json()) as { success: boolean };

        if (!turnstileData.success) {
          return {
            success: false,
            message: "Did you complete the CAPTCHA? (If you're human, that is...)",
          };
        }

        if (!process.env.RESEND_FROM_EMAIL) {
          console.warn("[contact form] RESEND_FROM_EMAIL not set, falling back to onboarding@resend.dev.");
        }

        // send email
        const resend = new Resend(process.env.RESEND_API_KEY);
        await resend.emails.send({
          from: `${data.output.name} <${process.env.RESEND_FROM_EMAIL ?? "onboarding@resend.dev"}>`,
          replyTo: `${data.output.name} <${data.output.email}>`,
          to: [config.authorEmail],
          subject: `[${config.siteName}] Contact Form Submission`,
          text: data.output.message,
        });

        return { success: true, message: "Thanks! You should hear from me soon." };
      } catch (error) {
        Sentry.captureException(error);

        return {
          success: false,
          message: "Internal server error. Please try again later or shoot me an email.",
        };
      }
    }
  );
};
