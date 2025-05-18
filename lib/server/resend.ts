"use server";

import { env } from "@/lib/env";
import { headers } from "next/headers";
import { Resend } from "resend";
import { z } from "zod";
import siteConfig from "@/lib/config/site";

const ContactSchema = z
  .object({
    name: z.string().trim().min(1, { message: "Your name is required." }),
    email: z.string().email({ message: "Your email address is required." }),
    message: z.string().trim().min(15, { message: "Your message must be at least 15 characters." }),
    "cf-turnstile-response": z.string().min(1, { message: "Are you sure you're not a robot...? 🤖" }),
  })
  .readonly();

export type ContactInput = z.infer<typeof ContactSchema>;

export type ContactState = {
  success: boolean;
  message: string;
  errors?: Record<string, string[]>;
};

export const send = async (state: ContactState, payload: FormData): Promise<ContactState> => {
  // TODO: remove after debugging why automated spam entries are causing 500 errors
  console.debug("[server/resend] received payload:", payload);

  try {
    const data = ContactSchema.safeParse(Object.fromEntries(payload));

    if (!data.success) {
      return {
        success: false,
        message: "Please make sure all fields are filled in.",
        errors: data.error.flatten().fieldErrors,
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
        response: data.data["cf-turnstile-response"],
        remoteip,
      }),
      cache: "no-store",
    });

    if (!turnstileResponse || !turnstileResponse.ok) {
      throw new Error(`[server/resend] turnstile validation failed: ${turnstileResponse.status}`);
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
      console.warn("[server/resend] 'RESEND_FROM_EMAIL' is not set, falling back to onboarding@resend.dev.");
    }

    // send email
    const resend = new Resend(env.RESEND_API_KEY);
    await resend.emails.send({
      from: `${data.data.name} <${env.RESEND_FROM_EMAIL || "onboarding@resend.dev"}>`,
      replyTo: `${data.data.name} <${data.data.email}>`,
      to: [env.RESEND_TO_EMAIL],
      subject: `[${siteConfig.name}] Contact Form Submission`,
      text: data.data.message,
    });

    return { success: true, message: "Thanks! You should hear from me soon." };
  } catch (error) {
    console.error("[server/resend] fatal error:", error);

    return {
      success: false,
      message: "Internal server error. Please try again later or shoot me an email.",
    };
  }
};
