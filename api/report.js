import * as Sentry from "@sentry/node";
import fetch from "node-fetch";
import getStream from "get-stream";

Sentry.init({
  dsn: process.env.SENTRY_DSN || "",
  environment: process.env.NODE_ENV || process.env.VERCEL_ENV || "",
});

// this "proxy" to report-uri.com is temporary until I'm bored enough to make my own reporting API from scratch
// https://report-uri.com/account/setup/
const REPORT_URI_SUBDOMAIN = "jarvis";

export default async (req, res) => {
  try {
    // permissive access control headers
    res.setHeader("Access-Control-Allow-Methods", "POST");
    res.setHeader("Access-Control-Allow-Origin", "*");
    // disable caching on both ends
    res.setHeader("Cache-Control", "private, no-cache, no-store, must-revalidate");
    res.setHeader("Expires", 0);
    res.setHeader("Pragma", "no-cache");

    if (req.method !== "POST") {
      return res.status(405).send(); // 405 Method Not Allowed
    }

    // start parsing body manually, since the serverless helper functions don't recognize `application/csp-report` and
    // `application/reports` as JSON to be parsed:
    // https://vercel.com/docs/runtimes#official-runtimes/node-js/node-js-request-and-response-objects/request-body
    const body = JSON.parse(await getStream(req));

    // default to returning 400 Bad Request for an invalid POST request
    let statusCode = 400;

    // TODO: add Expect-CT reporting endpoint
    if (typeof req.query.csp !== "undefined" && req.headers["content-type"].startsWith("application/csp-report")) {
      // send a CSP violation:
      // https://docs.report-uri.com/setup/csp/
      statusCode = await sendCsp(body, req.headers);
    } else if (req.headers["content-type"].startsWith("application/reports")) {
      // send a report:
      // https://docs.report-uri.com/setup/reporting-api/
      statusCode = await sendReport(body, req.headers);
    }

    return res.status(statusCode).send();
  } catch (error) {
    console.error(error);

    // log error to sentry, give it 2 seconds to finish sending
    Sentry.captureException(error);
    await Sentry.flush(2000);

    return res.status(500).send(); // 500 Internal Server Error
  }
};

const sendCsp = async (body, headers) => {
  // filter out any last invalid reports (JSON must have at least one csp-report object)
  if (Object.hasOwnProperty.call(body, "csp-report")) {
    const response = await fetch(`https://${REPORT_URI_SUBDOMAIN}.report-uri.com/r/d/csp/enforce`, {
      method: "POST",
      headers: {
        "Content-Type": "application/csp-report",
        "User-Agent": headers["user-agent"],
        Origin: headers["origin"],
      },
      body: JSON.stringify(body),
    });

    // API returns 201 Created if successful
    if (response.status !== 201) {
      console.error(`[CSP] ${response.status}: ${await response.text()}`);
    }

    return response.status;
  }

  return 400; // 400 Bad Request
};

const sendReport = async (body, headers) => {
  const response = await fetch(`https://${REPORT_URI_SUBDOMAIN}.report-uri.com/a/d/g`, {
    method: "POST",
    headers: {
      "Content-Type": "application/reports+json",
      "User-Agent": headers["user-agent"],
      Origin: headers["origin"],
    },
    body: JSON.stringify(body),
  });

  // API returns 201 Created if successful
  if (response.status !== 201) {
    console.error(`[REPORT] ${response.status}: ${await response.text()}`);
  }

  return response.status;
};
