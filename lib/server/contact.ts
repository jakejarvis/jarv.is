"use server";

import { checkBotId } from "botid/server";
import { Resend } from "resend";
import siteConfig from "@/lib/config/site";

import { ContactSchema } from "@/lib/schemas/contact";

export type ContactResult = {
  success: boolean;
  message: string;
  errors?: Record<string, string[]>;
};

export const sendContactForm = async (
  formData: FormData,
): Promise<ContactResult> => {
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
    if (process.env.RESEND_FROM_EMAIL === "onboarding@resend.dev") {
      // https://resend.com/docs/api-reference/emails/send-email
      console.warn(
        "[server/contact] 'RESEND_FROM_EMAIL' is not set, falling back to onboarding@resend.dev.",
      );
    }

    const resend = new Resend(process.env.RESEND_API_KEY);
    await resend.emails.send({
      from: `${parsed.data.name} <${process.env.RESEND_FROM_EMAIL || "onboarding@resend.dev"}>`,
      replyTo: `${parsed.data.name} <${parsed.data.email}>`,
      // biome-ignore lint/style/noNonNullAssertion: expected to be set in env
      to: [process.env.RESEND_TO_EMAIL!],
      subject: `[${siteConfig.name}] Contact Form Submission`,
      text: parsed.data.message,
    });

    return { success: true, message: "Thanks! You should hear from me soon." };
  } catch (error) {
    console.error("[server/contact] fatal error:", error);

    return {
      success: false,
      message:
        "Internal server error. Please try again later or shoot me an email.",
    };
  }
};
