"use server";

import { env } from "@/lib/env";
import { Resend } from "resend";
import { ContactSchema } from "@/lib/validation/contact";
import siteConfig from "@/lib/config/site";
import { checkBotId } from "botid/server";

// Schema and type now imported from shared validation module

export type ContactState = {
  success: boolean;
  message: string;
  errors?: Record<string, string[]>;
};

export const send = async (state: ContactState, payload: FormData): Promise<ContactState> => {
  // TODO: remove after debugging why automated spam entries are causing 500 errors
  console.debug("[server/resend] received payload:", payload);

  try {
    // BotID server-side verification
    const verification = await checkBotId();
    if (verification.isBot) {
      return { success: false, message: "Bot detection failed. 🤖" };
    }

    const data = ContactSchema.safeParse(Object.fromEntries(payload));

    if (!data.success) {
      return {
        success: false,
        message: "Please make sure all fields are filled in.",
        errors: data.error.flatten().fieldErrors,
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
