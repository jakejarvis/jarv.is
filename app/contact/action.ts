"use server";

import { env } from "@/lib/env";
import { headers } from "next/headers";
import * as v from "valibot";
import { Resend } from "resend";
import siteConfig from "@/lib/config/site";

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

export const send = async (state: ContactState, payload: FormData): Promise<ContactState> => {
  // TODO: remove after debugging why automated spam entries are causing 500 errors
  console.debug("[/contact] received payload:", payload);

  try {
    const data = v.safeParse(ContactSchema, Object.fromEntries(payload));

    if (!data.success) {
      return {
        success: false,
        message: "Please make sure all fields are filled in.",
        errors: v.flatten(data.issues).nested,
      };
    }

    // try to get the client IP (for turnstile accuracy, not logging!) but no biggie if we can't
    let remoteip;
    try {
      remoteip = (await headers()).get("x-forwarded-for");
    } catch {} // eslint-disable-line no-empty

    // validate captcha
    const turnstileResponse = await fetch("https://challenges.cloudflare.com/turnstile/v0/siteverify", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        secret: env.TURNSTILE_SECRET_KEY,
        response: data.output["cf-turnstile-response"],
        remoteip,
      }),
      cache: "no-store",
    });

    if (!turnstileResponse || !turnstileResponse.ok) {
      throw new Error(`[/contact] turnstile validation failed: ${turnstileResponse.status}`);
    }

    const turnstileData = (await turnstileResponse.json()) as { success: boolean };

    if (!turnstileData.success) {
      return {
        success: false,
        message: "Did you complete the CAPTCHA? (If you're human, that is...)",
      };
    }

    if (env.RESEND_FROM_EMAIL === "onboarding@resend.dev") {
      // https://resend.com/docs/api-reference/emails/send-email
      console.warn("[/contact] 'RESEND_FROM_EMAIL' is not set, falling back to onboarding@resend.dev.");
    }

    // send email
    const resend = new Resend(env.RESEND_API_KEY);
    await resend.emails.send({
      from: `${data.output.name} <${env.RESEND_FROM_EMAIL || "onboarding@resend.dev"}>`,
      replyTo: `${data.output.name} <${data.output.email}>`,
      to: [env.RESEND_TO_EMAIL],
      subject: `[${siteConfig.name}] Contact Form Submission`,
      text: data.output.message,
    });

    return { success: true, message: "Thanks! You should hear from me soon." };
  } catch (error) {
    console.error("[/contact] fatal error:", error);

    return {
      success: false,
      message: "Internal server error. Please try again later or shoot me an email.",
    };
  }
};
