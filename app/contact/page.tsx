import { headers } from "next/headers";
import * as v from "valibot";
import { Resend } from "resend";
import PageTitle from "../../components/PageTitle";
import Link from "../../components/Link";
import { addMetadata } from "../../lib/helpers/metadata";
import * as config from "../../lib/config";

import ContactForm from "./form";
import ContactSchema, { type ContactState } from "./schema";

export const metadata = addMetadata({
  title: "Contact Me",
  description: "Fill out this quick form and I'll get back to you as soon as I can.",
  alternates: {
    canonical: "/contact",
  },
});

const send = async (state: ContactState, payload: FormData): Promise<ContactState> => {
  "use server";

  // TODO: remove after debugging why automated spam entries are causing 500 errors
  console.debug("[contact form] received payload:", payload);

  if (!process.env.RESEND_API_KEY) {
    throw new Error("[contact form] 'RESEND_API_KEY' is not set.");
  }

  try {
    const data = v.safeParse(ContactSchema, Object.fromEntries(payload));

    if (!data.success) {
      return {
        success: false,
        message: "Please make sure all fields are filled in.",
        errors: v.flatten(data.issues).nested,
      };
    }

    // try to get the client IP (for turnstile accuracy, not logging!) but no biggie if we can't
    let remoteip;
    try {
      remoteip = (await headers()).get("x-forwarded-for");
    } catch {} // eslint-disable-line no-empty

    // validate captcha
    const turnstileResponse = await fetch("https://challenges.cloudflare.com/turnstile/v0/siteverify", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        secret: process.env.TURNSTILE_SECRET_KEY || "1x0000000000000000000000000000000AA",
        response: data.output["cf-turnstile-response"],
        remoteip,
      }),
      cache: "no-store",
    });

    if (!turnstileResponse || !turnstileResponse.ok) {
      throw new Error(`[contact form] turnstile validation failed: ${turnstileResponse.status}`);
    }

    const turnstileData = (await turnstileResponse.json()) as { success: boolean };

    if (!turnstileData.success) {
      return {
        success: false,
        message: "Did you complete the CAPTCHA? (If you're human, that is...)",
      };
    }

    if (!process.env.RESEND_FROM_EMAIL) {
      // https://resend.com/docs/api-reference/emails/send-email
      console.warn("[contact form] 'RESEND_FROM_EMAIL' is not set, falling back to onboarding@resend.dev.");
    }

    // send email
    const resend = new Resend(process.env.RESEND_API_KEY!);
    await resend.emails.send({
      from: `${data.output.name} <${process.env.RESEND_FROM_EMAIL || "onboarding@resend.dev"}>`,
      replyTo: `${data.output.name} <${data.output.email}>`,
      to: [config.authorEmail],
      subject: `[${config.siteName}] Contact Form Submission`,
      text: data.output.message,
    });

    return { success: true, message: "Thanks! You should hear from me soon." };
  } catch (error) {
    console.error("[contact form] fatal error:", error);

    return {
      success: false,
      message: "Internal server error. Please try again later or shoot me an email.",
    };
  }
};

const Page = () => {
  return (
    <div
      style={{
        maxWidth: "600px",
        margin: "0 auto",
      }}
    >
      <PageTitle canonical="/contact">Contact</PageTitle>

      <p>
        Fill out this quick form and I&rsquo;ll get back to you as soon as I can! You can also{" "}
        <Link href="mailto:jake@jarv.is">email me directly</Link> or send me a{" "}
        <Link href="https://fediverse.jarv.is/@jake">direct message on Mastodon</Link>.
      </p>
      <p>
        🔐 You can grab my public key here:{" "}
        <Link href="https://jrvs.io/pgp" title="My Public Key">
          <code
            style={{
              fontFamily: "var(--fonts-mono)",
              fontSize: "0.925em",
              letterSpacing: "0.075em",
              wordSpacing: "-0.3em",
            }}
          >
            6BF3 79D3 6F67 1480 2B0C 9CF2 51E6 9A39
          </code>
        </Link>
        .
      </p>

      <ContactForm serverAction={send} />
    </div>
  );
};

export default Page;
