import nodemailer from "nodemailer";
import queryString from "query-string";
import fetcher from "../../lib/helpers/fetcher";
import { siteDomain, authorEmail, hcaptchaSiteKey } from "../../lib/config";
import type { NextApiHandler } from "next";

const handler: NextApiHandler = async (req, res) => {
  // redirect GET requests to this endpoint to the contact form itself
  if (req.method === "GET") {
    return res.redirect(`${process.env.NEXT_PUBLIC_BASE_URL || `https://${siteDomain}`}/contact/`);
  }

  // possible weirdness? https://github.com/orgs/vercel/discussions/78#discussioncomment-5089059
  const data = req.body;

  // these are both backups to client-side validations just in case someone squeezes through without them. the codes
  // are identical so they're caught in the same fashion.
  if (!data.name || !data.email || !data.message) {
    // all fields are required
    throw new Error("MISSING_DATA");
  }
  if (!data["h-captcha-response"] || !(await validateCaptcha(data["h-captcha-response"]))) {
    // either the captcha is wrong or completely missing
    throw new Error("INVALID_CAPTCHA");
  }

  // throw an internal error, not user's fault
  if (!(await sendMessage(data))) {
    throw new Error("NODEMAILER_ERROR");
  }

  // disable caching on both ends. see:
  // https://vercel.com/docs/concepts/functions/edge-functions/edge-caching
  res.setHeader("Cache-Control", "private, no-cache, no-store, must-revalidate");

  // success! let the client know
  return res.status(201).json({ success: true });
};

const validateCaptcha = async (formResponse: unknown): Promise<unknown> => {
  const response = await fetcher("https://hcaptcha.com/siteverify", {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: queryString.stringify({
      response: formResponse,
      // fallback to dummy secret for testing: https://docs.hcaptcha.com/#integration-testing-test-keys
      sitekey: hcaptchaSiteKey || "10000000-ffff-ffff-ffff-000000000001",
      secret: process.env.HCAPTCHA_SECRET_KEY || "0x0000000000000000000000000000000000000000",
    }),
  });

  return response?.success;
};

const sendMessage = async (data: Record<string, unknown>): Promise<boolean> => {
  try {
    const transporter = nodemailer.createTransport({
      service: "mailgun",
      auth: {
        user: process.env.MAILGUN_SMTP_USER,
        pass: process.env.MAILGUN_SMTP_PASS,
      },
    });

    await transporter.sendMail({
      from: `${data.name} <${process.env.MAILGUN_SMTP_USER}>`,
      sender: `nodemailer <${process.env.MAILGUN_SMTP_USER}>`,
      replyTo: `${data.name} <${data.email}>`,
      to: `<${authorEmail}>`,
      subject: `[${siteDomain}] Contact Form Submission`,
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
