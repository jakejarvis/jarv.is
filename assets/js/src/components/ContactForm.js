import { h, Fragment } from "preact";
import { useState } from "preact/hooks";
import fetch from "unfetch";
import { isDark } from "../utils/theme.js";

// react components:
import HCaptcha from "@hcaptcha/react-hcaptcha";
import { CheckIcon, XIcon } from "@primer/octicons-react";
import SendEmoji from "twemoji-emojis/vendor/svg/1f4e4.svg";

const ContactForm = () => {
  // status/feedback:
  const [status, setStatus] = useState({ success: false, message: "" });
  // keep track of fetch:
  const [sending, setSending] = useState(false);

  const onSubmit = (e) => {
    // immediately prevent browser from actually navigating to a new page
    e.preventDefault();

    // begin the process
    setSending(true);

    // extract data from form fields
    const formData = {
      name: e.target.elements.name?.value,
      email: e.target.elements.email?.value,
      message: e.target.elements.message?.value,
      "h-captcha-response": e.target.elements["h-captcha-response"]?.value,
    };

    // some client-side validation to save requests (these are also checked on the server to be safe)
    // TODO: change border color of the specific empty/missing field(s) to red
    if (!(formData.name && formData.email && formData.message && formData["h-captcha-response"])) {
      setSending(false);
      setStatus({ success: false, message: "Please make sure that all fields are filled in." });

      // remove focus from the submit button
      document.activeElement.blur();

      return;
    }

    // if we've gotten here then all data is (or should be) valid and ready to post to API
    fetch("/api/contact/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify(formData),
    })
      .then((response) => response.json())
      .then((data) => {
        setSending(false);

        if (data.success === true) {
          // handle successful submission
          // disable submissions, hide the send button, and let user know we were successful
          setStatus({ success: true, message: "Thanks! You should hear from me soon." });
        } else {
          // pass on any error sent by the server
          throw new Error(data.message);
        }
      })
      .catch((error) => {
        const message = error instanceof Error ? error.message : "UNKNOWN_EXCEPTION";

        setSending(false);

        // give user feedback based on the error message returned
        if (message === "USER_INVALID_CAPTCHA") {
          setStatus({
            success: false,
            message: "Did you complete the CAPTCHA? (If you're human, that is...)",
          });
        } else if (message === "USER_MISSING_DATA") {
          setStatus({
            success: false,
            message: "Please make sure that all fields are filled in.",
          });
        } else {
          // something else went wrong, and it's probably my fault...
          setStatus({ success: false, message: "Internal server error. Try again later?" });
        }

        // remove focus from the submit button
        document.activeElement.blur();
      });
  };

  return (
    <form onSubmit={onSubmit} id="contact-form" action="/api/contact/" method="POST">
      <input type="text" name="name" placeholder="Name" disabled={status.success} />
      <input type="email" name="email" placeholder="Email" disabled={status.success} />
      <textarea name="message" placeholder="Write something..." disabled={status.success} />

      <div id="contact-form-md-info">
        Basic{" "}
        <a
          href="https://commonmark.org/help/"
          title="Markdown reference sheet"
          target="_blank"
          rel="noopener noreferrer"
        >
          Markdown syntax
        </a>{" "}
        is allowed here, e.g.: <strong>**bold**</strong>, <em>_italics_</em>, [
        <a href="https://jarv.is" target="_blank" rel="noopener noreferrer">
          links
        </a>
        ](https://jarv.is), and <code>`code`</code>.
      </div>

      <div id="contact-form-captcha">
        <HCaptcha
          sitekey={process.env.HCAPTCHA_SITE_KEY}
          theme={isDark() ? "dark" : "light"}
          size="normal"
          reCaptchaCompat={false}
          onVerify={() => true} // this is allegedly optional but a function undefined error is thrown without it
        />
      </div>

      <div id="contact-form-action-row">
        <button
          id="contact-form-btn-submit"
          title="Send Message"
          aria-label="Send Message"
          disabled={sending}
          style={{ display: status.success ? "none" : null }}
        >
          {sending ? (
            <span>Sending...</span>
          ) : (
            <>
              <SendEmoji class="emoji" /> <span>Send</span>
            </>
          )}
        </button>

        <span
          class="contact-form-result"
          id={status.success ? "contact-form-result-success" : "contact-form-result-error"}
          style={{ display: !status.message || sending ? "none" : null }}
        >
          {status.success ? <CheckIcon size={16} /> : <XIcon size={16} />} {status.message}
        </span>
      </div>
    </form>
  );
};

export default ContactForm;
