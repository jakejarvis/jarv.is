import nodemailer from "nodemailer";
import fetcher from "../../../lib/helpers/fetcher";
import config from "../../../lib/config";
import { headers } from "next/headers";
import { NextResponse, NextRequest } from "next/server";

export async function POST(req: NextRequest): Promise<
  NextResponse<{
    success?: boolean;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    error?: any;
  } | null>
> {
  try {
    // possible weirdness? https://github.com/orgs/vercel/discussions/78#discussioncomment-5089059
    const data = await req.formData();
    const headersList = await headers();

    // these are both backups to client-side validations just in case someone squeezes through without them. the codes
    // are identical so they're caught in the same fashion.
    if (!data.get("name") || !data.get("email") || !data.get("message")) {
      // all fields are required
      throw new Error("missing_data");
    }
    if (
      !data.get("cf-turnstile-response") ||
      !(await validateCaptcha(
        data.get("cf-turnstile-response"),
        headersList.get("x-forwarded-for") || headersList.get("x-real-ip") || ""
      ))
    ) {
      // either the captcha is wrong or completely missing
      throw new Error("invalid_captcha");
    }

    // throw an internal error, not user's fault
    if (!(await sendMessage(data))) {
      throw new Error("nodemailer_error");
    }

    // success! let the client know
    return NextResponse.json({ success: true }, { status: 201 });
  } catch (
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    error: any
  ) {
    return NextResponse.json({ error: error.message ?? "Bad request." }, { status: 400 });
  }
}

const validateCaptcha = async (formResponse: unknown, ip: string): Promise<unknown> => {
  const response = await fetcher("https://challenges.cloudflare.com/turnstile/v0/siteverify", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      // fallback to dummy secret for testing: https://developers.cloudflare.com/turnstile/troubleshooting/testing/
      secret: process.env.TURNSTILE_SECRET_KEY || "1x0000000000000000000000000000000AA",
      response: formResponse,
      remoteip: ip,
    }),
  });

  return response?.success;
};

const sendMessage = async (data: FormData): Promise<boolean> => {
  try {
    const transporter = nodemailer.createTransport({
      // https://resend.com/docs/send-with-nodemailer-smtp
      host: "smtp.resend.com",
      secure: true,
      port: 465,
      auth: {
        user: "resend",
        pass: process.env.RESEND_API_KEY,
      },
    });

    await transporter.sendMail({
      from: `${data.get("name")} <${process.env.RESEND_DOMAIN ? `noreply@${process.env.RESEND_DOMAIN}` : "onboarding@resend.dev"}>`,
      sender: `nodemailer <${process.env.RESEND_DOMAIN ? `noreply@${process.env.RESEND_DOMAIN}` : "onboarding@resend.dev"}>`,
      replyTo: `${data.get("name")} <${data.get("email")}>`,
      to: `<${config.authorEmail}>`,
      subject: `[${config.siteDomain}] Contact Form Submission`,
      // TODO: add markdown parsing as promised on the form.
      text: `${data.get("message")}`,
    });
  } catch (error) {
    console.error(error);
    return false;
  }

  return true;
};
