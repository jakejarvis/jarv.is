import { createServerFn } from "@tanstack/react-start";
import { Resend } from "resend";
import { z } from "zod";
import siteConfig from "@/lib/config/site";
import { ContactSchema } from "@/lib/schemas/contact";

export type ContactResult = {
  success: boolean;
  message: string;
  errors?: Record<string, string[]>;
};

export const sendContactForm = createServerFn({ method: "POST" })
  .inputValidator(
    z.object({
      name: z.string(),
      email: z.string(),
      message: z.string(),
    }),
  )
  .handler(async ({ data }): Promise<ContactResult> => {
    const parsed = ContactSchema.safeParse(data);

    if (!parsed.success) {
      return {
        success: false,
        message: "Please make sure all fields are filled in correctly.",
        errors: parsed.error.flatten().fieldErrors,
      };
    }

    try {
      const resend = new Resend(process.env.RESEND_API_KEY);
      await resend.emails.send({
        from: `${parsed.data.name} <${process.env.RESEND_FROM_EMAIL || "onboarding@resend.dev"}>`,
        replyTo: `${parsed.data.name} <${parsed.data.email}>`,
        // biome-ignore lint/style/noNonNullAssertion: expected to be set in env
        to: [process.env.RESEND_TO_EMAIL!],
        subject: `[${siteConfig.name}] Contact Form Submission`,
        text: parsed.data.message,
      });

      return {
        success: true,
        message: "Thanks! You should hear from me soon.",
      };
    } catch (error) {
      console.error("[server/contact] fatal error:", error);

      return {
        success: false,
        message:
          "Internal server error. Please try again later or shoot me an email.",
      };
    }
  });
