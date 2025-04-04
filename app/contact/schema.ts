import * as v from "valibot";

export const ContactSchema = v.object({
  // TODO: replace duplicate error messages with v.message() when released. see:
  // https://valibot.dev/api/message/
  // https://github.com/fabian-hiller/valibot/blob/main/library/src/methods/message/message.ts
  name: v.pipe(v.string("Your name is required."), v.trim(), v.nonEmpty("Your name is required.")),
  email: v.pipe(
    v.string("Your email address is required."),
    v.trim(),
    v.nonEmpty("Your email address is required."),
    v.email("Invalid email address.")
  ),
  message: v.pipe(
    v.string("A message is required."),
    v.trim(),
    v.nonEmpty("A message is required."),
    v.minLength(10, "Your message must be at least 10 characters.")
  ),
  "cf-turnstile-response": v.pipe(
    // token wasn't submitted at _all_, most likely a direct POST request by a spam bot
    v.string("Shoo, bot."),
    // form submitted properly but token was missing, might be a forgetful human
    v.nonEmpty("Just do the stinkin CAPTCHA, human! 🤖"),
    // very rudimentary length check based on Cloudflare's docs
    // https://developers.cloudflare.com/turnstile/troubleshooting/testing/
    v.minLength("XXXX.DUMMY.TOKEN.XXXX".length),
    // "A Turnstile token can have up to 2048 characters."
    // https://developers.cloudflare.com/turnstile/get-started/server-side-validation/
    v.maxLength(2048),
    v.readonly()
  ),
});

export type ContactInput = v.InferInput<typeof ContactSchema>;

export type ContactState = {
  success: boolean;
  message: string;
  errors?: v.FlatErrors<typeof ContactSchema>["nested"];
};

export default ContactSchema;
