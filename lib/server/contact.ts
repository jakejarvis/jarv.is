"use server";

import { env } from "@/lib/env";
import { Resend } from "resend";
import { ContactSchema } from "@/lib/schemas/contact";
import siteConfig from "@/lib/config/site";
import { checkBotId } from "botid/server";

export type ContactResult = {
  success: boolean;
  message: string;
  errors?: Record<string, string[]>;
};

export const sendContactForm = async (formData: FormData): Promise<ContactResult> => {
  // TODO: remove after debugging why automated spam entries are causing 500 errors
  console.debug("[server/contact] received payload:", formData);

  // BotID server-side verification
  const verification = await checkBotId();
  if (verification.isBot) {
    console.warn("[server/contact] botid verification failed:", verification);
    return {
      success: false,
      message: "Verification failed. Please try again.",
    };
  }

  const parsed = ContactSchema.safeParse(Object.fromEntries(formData));

  if (!parsed.success) {
    return {
      success: false,
      message: "Please make sure all fields are filled in correctly.",
      errors: parsed.error.flatten().fieldErrors,
    };
  }

  try {
    if (env.RESEND_FROM_EMAIL === "onboarding@resend.dev") {
      // https://resend.com/docs/api-reference/emails/send-email
      console.warn("[server/contact] 'RESEND_FROM_EMAIL' is not set, falling back to onboarding@resend.dev.");
    }

    const resend = new Resend(env.RESEND_API_KEY);
    await resend.emails.send({
      from: `${parsed.data.name} <${env.RESEND_FROM_EMAIL || "onboarding@resend.dev"}>`,
      replyTo: `${parsed.data.name} <${parsed.data.email}>`,
      to: [env.RESEND_TO_EMAIL],
      subject: `[${siteConfig.name}] Contact Form Submission`,
      text: parsed.data.message,
    });

    return { success: true, message: "Thanks! You should hear from me soon." };
  } catch (error) {
    console.error("[server/contact] fatal error:", error);

    return {
      success: false,
      message: "Internal server error. Please try again later or shoot me an email.",
    };
  }
};
