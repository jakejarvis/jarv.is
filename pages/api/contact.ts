import { NextResponse } from "next/server";
import queryString from "query-string";
import type { NextRequest } from "next/server";

// fallback to dummy secret for testing: https://docs.hcaptcha.com/#integration-testing-test-keys
const HCAPTCHA_SITE_KEY =
  process.env.HCAPTCHA_SITE_KEY || process.env.NEXT_PUBLIC_HCAPTCHA_SITE_KEY || "10000000-ffff-ffff-ffff-000000000001";
const HCAPTCHA_SECRET_KEY = process.env.HCAPTCHA_SECRET_KEY || "0x0000000000000000000000000000000000000000";
const HCAPTCHA_API_ENDPOINT = "https://hcaptcha.com/siteverify";

const { AIRTABLE_API_KEY, AIRTABLE_BASE } = process.env;
const AIRTABLE_API_ENDPOINT = "https://api.airtable.com/v0/";

export const config = {
  runtime: "edge",
};

// eslint-disable-next-line import/no-anonymous-default-export
export default async (req: NextRequest) => {
  // redirect GET requests to this endpoint to the contact form itself
  if (req.method === "GET") {
    return NextResponse.redirect(`${process.env.BASE_URL}/contact/`);
  }

  // possible weirdness? https://github.com/orgs/vercel/discussions/78#discussioncomment-5089059
  const data = await req.json();

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

  // sent directly to airtable
  const airtableResult = await sendToAirtable({
    Name: data.name,
    Email: data.email,
    Message: data.message,
  });

  // throw an internal error, not user's fault
  if (airtableResult !== true) {
    throw new Error("AIRTABLE_API_ERROR");
  }

  // success! let the client know
  return NextResponse.json(
    { success: true },
    {
      status: 201,
      headers: {
        // disable caching on both ends. see:
        // https://vercel.com/docs/concepts/functions/edge-functions/edge-caching
        "Cache-Control": "private, no-cache, no-store, must-revalidate",
      },
    }
  );
};

const validateCaptcha = async (formResponse: unknown): Promise<unknown> => {
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

const sendToAirtable = async (data: unknown): Promise<boolean> => {
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
