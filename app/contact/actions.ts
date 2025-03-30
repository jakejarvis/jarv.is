"use server";

import { headers } from "next/headers";
import { z } from "zod";
import { Resend } from "resend";
import * as Sentry from "@sentry/nextjs";
import * as config from "../../lib/config";

const schema = z.object({
  name: z.string().min(1, { message: "Name is required" }),
  email: z.string().email({ message: "Invalid email address" }),
  message: z.string().min(1, { message: "Message is required" }),
  ["cf-turnstile-response"]: z.string().min(1, { message: "CAPTCHA not completed" }),
});

export const sendMessage = async (
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  prevState: any,
  formData: FormData
): Promise<{
  success: boolean;
  message: string;
  errors?: z.inferFormattedError<typeof schema>;
  payload?: FormData;
}> => {
  return await Sentry.withServerActionInstrumentation(
    "sendMessage",
    {
      formData,
      headers: headers(),
      recordResponse: true,
    },
    async () => {
      try {
        const validatedFields = schema.safeParse(Object.fromEntries(formData));

        // backup to client-side validations just in case someone squeezes through without them
        if (!validatedFields.success) {
          console.debug("[contact form] validation error:", validatedFields.error.flatten());

          return {
            success: false,
            message: "Please make sure that all fields are properly filled in.",
            errors: validatedFields.error.format(),
            payload: formData,
          };
        }

        // validate captcha
        const turnstileResponse = await fetch("https://challenges.cloudflare.com/turnstile/v0/siteverify", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            secret: process.env.TURNSTILE_SECRET_KEY || "1x0000000000000000000000000000000AA",
            response: validatedFields.data["cf-turnstile-response"],
            remoteip: (await headers()).get("x-forwarded-for") || "",
          }),
          cache: "no-store",
          signal: AbortSignal.timeout(5000), // 5 second timeout
        });

        if (!turnstileResponse.ok) {
          throw new Error(`[contact form] turnstile validation failed: ${turnstileResponse.status}`);
        }

        const turnstileData = (await turnstileResponse.json()) as { success: boolean };

        if (!turnstileData.success) {
          return {
            success: false,
            message: "Did you complete the CAPTCHA? (If you're human, that is...)",
            payload: formData,
          };
        }

        if (!process.env.RESEND_FROM_EMAIL) {
          console.warn("[contact form] RESEND_FROM_EMAIL not set, falling back to onboarding@resend.dev.");
        }

        // send email
        const resend = new Resend(process.env.RESEND_API_KEY);
        await resend.emails.send({
          from: `${validatedFields.data.name} <${process.env.RESEND_FROM_EMAIL ?? "onboarding@resend.dev"}>`,
          replyTo: `${validatedFields.data.name} <${validatedFields.data.email}>`,
          to: [config.authorEmail],
          subject: `[${config.siteName}] Contact Form Submission`,
          text: validatedFields.data.message,
        });

        return { success: true, message: "Thanks! You should hear from me soon.", payload: formData };
      } catch (error) {
        Sentry.captureException(error);

        return {
          success: false,
          message: "Internal server error... Try again later or shoot me an old-fashioned email?",
          errors: error instanceof z.ZodError ? error.format() : undefined,
          payload: formData,
        };
      }
    }
  );
};
