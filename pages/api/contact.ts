import queryString from "query-string";
import { logServerError } from "../../lib/helpers/sentry";
import type { NextApiRequest, NextApiResponse } from "next";

// fallback to dummy secret for testing: https://docs.hcaptcha.com/#integration-testing-test-keys
const HCAPTCHA_SITE_KEY =
  process.env.HCAPTCHA_SITE_KEY || process.env.NEXT_PUBLIC_HCAPTCHA_SITE_KEY || "10000000-ffff-ffff-ffff-000000000001";
const HCAPTCHA_SECRET_KEY = process.env.HCAPTCHA_SECRET_KEY || "0x0000000000000000000000000000000000000000";
const HCAPTCHA_API_ENDPOINT = "https://hcaptcha.com/siteverify";

const { AIRTABLE_API_KEY, AIRTABLE_BASE } = process.env;
const AIRTABLE_API_ENDPOINT = "https://api.airtable.com/v0/";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    // disable caching on both ends
    res.setHeader("Cache-Control", "private, no-cache, no-store, must-revalidate");
    res.setHeader("Pragma", "no-cache");

    if (req.method !== "POST") {
      // 405 Method Not Allowed
      return res.status(405).end();
    }

    const { body } = req;

    // these are both backups to client-side validations just in case someone squeezes through without them. the codes
    // are identical so they're caught in the same fashion.
    if (!body || !body.name || !body.email || !body.message) {
      // all fields are required
      throw new Error("USER_MISSING_DATA");
    }
    if (!body["h-captcha-response"] || !(await validateCaptcha(body["h-captcha-response"]))) {
      // either the captcha is wrong or completely missing
      throw new Error("USER_INVALID_CAPTCHA");
    }

    // sent directly to airtable
    const airtableResult = await sendToAirtable({
      Name: body.name,
      Email: body.email,
      Message: body.message,
    });

    // throw an internal error, not user's fault
    if (airtableResult !== true) {
      throw new Error("AIRTABLE_API_ERROR");
    }

    // success! let the client know
    return res.status(200).json({ success: true });
  } catch (error) {
    // extract just the error message to send back to client
    const message = error instanceof Error ? error.message : "UNKNOWN_EXCEPTION";

    // log errors (except PEBCAK) to console and sentry
    if (!message.startsWith("USER_")) {
      await logServerError(error);
    }

    // 500 Internal Server Error
    return res.status(500).json({ success: false, message });
  }
};

const validateCaptcha = async (formResponse: unknown) => {
  const response = await fetch(HCAPTCHA_API_ENDPOINT, {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: queryString.stringify({
      response: formResponse,
      sitekey: HCAPTCHA_SITE_KEY,
      secret: HCAPTCHA_SECRET_KEY,
    }),
  });

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const result: any = await response.json();

  return result.success as boolean;
};

const sendToAirtable = async (data: unknown) => {
  const response = await fetch(`${AIRTABLE_API_ENDPOINT}${AIRTABLE_BASE}/Messages`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${AIRTABLE_API_KEY}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      fields: data,
    }),
  });

  return response.ok;
};

export default handler;
