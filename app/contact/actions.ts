"use server";

import { Resend } from "resend";
import config from "../../lib/config";

export async function sendMessage(
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  prevState: any,
  formData: FormData
): Promise<{
  success: boolean;
  message: string;
  payload: FormData;
}> {
  try {
    // these are both backups to client-side validations just in case someone squeezes through without them. the codes
    // are identical so they're caught in the same fashion.
    if (!formData || !formData.get("name") || !formData.get("email") || !formData.get("message")) {
      return { success: false, message: "Please make sure that all fields are properly filled in.", payload: formData };
    }

    // validate captcha
    const turnstileResponse = await fetch("https://challenges.cloudflare.com/turnstile/v0/siteverify", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        secret: process.env.TURNSTILE_SECRET_KEY || "1x0000000000000000000000000000000AA",
        response: formData.get("cf-turnstile-response"),
      }),
    });
    const turnstileData = await turnstileResponse.json();

    if (!turnstileData || !turnstileData.success) {
      return {
        success: false,
        message: "Did you complete the CAPTCHA? (If you're human, that is...)",
        payload: formData,
      };
    }

    // send email
    const resend = new Resend(process.env.RESEND_API_KEY);
    await resend.emails.send({
      from: `${formData.get("name")} <${process.env.RESEND_DOMAIN ? `noreply@${process.env.RESEND_DOMAIN}` : "onboarding@resend.dev"}>`,
      replyTo: `${formData.get("name")} <${formData.get("email")}>`,
      to: [config.authorEmail],
      subject: `[${config.siteName}] Contact Form Submission`,
      text: formData.get("message") as string,
    });

    return { success: true, message: "Thanks! You should hear from me soon.", payload: formData };
  } catch (error) {
    console.error(error);

    return {
      success: false,
      message: "Internal server error... Try again later or shoot me an old-fashioned email?",
      payload: formData,
    };
  }
}
