import nodemailer from "nodemailer";
import fetcher from "../../lib/helpers/fetcher";
import config from "../../lib/config";
import type { NextApiHandler } from "next";

const handler: NextApiHandler<
  {
    success?: boolean;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    error?: any;
  } | null
> = async (req, res) => {
  // only allow POST requests, otherwise return a 405 Method Not Allowed
  if (req.method !== "POST") {
    return res.status(405).send(null);
  }

  try {
    // possible weirdness? https://github.com/orgs/vercel/discussions/78#discussioncomment-5089059
    const data = req.body;

    // these are both backups to client-side validations just in case someone squeezes through without them. the codes
    // are identical so they're caught in the same fashion.
    if (!data.name || !data.email || !data.message) {
      // all fields are required
      throw new Error("missing_data");
    }
    if (
      !data["cf-turnstile-response"] ||
      !(await validateCaptcha(
        data["cf-turnstile-response"],
        (req.headers["x-forwarded-for"] as string) || (req.headers["x-real-ip"] as string) || ""
      ))
    ) {
      // either the captcha is wrong or completely missing
      throw new Error("invalid_captcha");
    }

    // throw an internal error, not user's fault
    if (!(await sendMessage(data))) {
      throw new Error("nodemailer_error");
    }

    // disable caching on both ends. see:
    // https://vercel.com/docs/concepts/functions/edge-functions/edge-caching
    res.setHeader("Cache-Control", "private, no-cache, no-store, must-revalidate");

    // success! let the client know
    return res.status(201).json({ success: true });
  } catch (
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    error: any
  ) {
    return res.status(400).json({ error: error.message ?? "Bad request." });
  }
};

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

const sendMessage = async (data: Record<string, unknown>): Promise<boolean> => {
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
      from: `${data.name} <${process.env.RESEND_DOMAIN ? `noreply@${process.env.RESEND_DOMAIN}` : "onboarding@resend.dev"}>`,
      sender: `nodemailer <${process.env.RESEND_DOMAIN ? `noreply@${process.env.RESEND_DOMAIN}` : "onboarding@resend.dev"}>`,
      replyTo: `${data.name} <${data.email}>`,
      to: `<${config.authorEmail}>`,
      subject: `[${config.siteDomain}] Contact Form Submission`,
      // TODO: add markdown parsing as promised on the form.
      text: `${data.message}`,
    });
  } catch (error) {
    console.error(error);
    return false;
  }

  return true;
};

export default handler;
