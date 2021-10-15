import * as Sentry from "@sentry/node";
import fetch from "node-fetch";
import queryString from "query-string";

// fallback to dummy secret for testing: https://docs.hcaptcha.com/#integration-testing-test-keys
const HCAPTCHA_SITE_KEY = process.env.HCAPTCHA_SITE_KEY || "10000000-ffff-ffff-ffff-000000000001";
const HCAPTCHA_SECRET_KEY =
  process.env.HCAPTCHA_SECRET_KEY || "0x0000000000000000000000000000000000000000";
const HCAPTCHA_API_ENDPOINT = "https://hcaptcha.com/siteverify";

const { AIRTABLE_API_KEY, AIRTABLE_BASE } = process.env;
const AIRTABLE_API_ENDPOINT = `https://api.airtable.com/v0/`;

Sentry.init({
  dsn: process.env.SENTRY_DSN || "",
  environment: process.env.NODE_ENV || process.env.VERCEL_ENV || "",
});

export default async (req, res) => {
  // disable caching on both ends
  res.setHeader("Cache-Control", "private, no-cache, no-store, must-revalidate");
  res.setHeader("Expires", 0);
  res.setHeader("Pragma", "no-cache");

  // permissive access control headers
  res.setHeader("Access-Control-Allow-Methods", "POST");
  res.setHeader("Access-Control-Allow-Origin", "*");

  try {
    // some rudimentary error handling
    if (req.method !== "POST") {
      throw new Error(`Method ${req.method} not allowed.`);
    }
    if (!AIRTABLE_API_KEY || !AIRTABLE_BASE) {
      throw new Error("Airtable API credentials aren't set.");
    }

    const { body } = req;

    // these are both backups to client-side validations just in case someone
    // squeezes through without them. the codes are identical so they're caught
    // in the same fashion.
    if (!body.name || !body.email || !body.message) {
      // all fields are required
      throw new Error("MISSING_DATA");
    }
    if (!body["h-captcha-response"] || !(await validateCaptcha(body["h-captcha-response"]))) {
      // either the captcha is wrong or completely missing
      throw new Error("INVALID_CAPTCHA");
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

    // return in JSON format
    res.status(200).json({ success: true });
  } catch (error) {
    console.error(error);

    const message = error instanceof Error ? error.message : "UNKNOWN_EXCEPTION";

    // don't log PEBCAK errors to sentry
    if (message !== "MISSING_DATA" && message !== "INVALID_CAPTCHA") {
      // log error to sentry, give it 2 seconds to finish sending
      Sentry.captureException(error);
      await Sentry.flush(2000);
    }

    res.status(400).json({ success: false, message: message });
  }
};

const validateCaptcha = async (formResponse) => {
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

  const result = await response.json();

  return result.success;
};

const sendToAirtable = async (data) => {
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
