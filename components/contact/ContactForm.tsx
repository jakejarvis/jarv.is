import { useState } from "react";
import HCaptcha from "@hcaptcha/react-hcaptcha";
import { CheckIcon, XIcon } from "@primer/octicons-react";
import SendIcon from "../icons/svg/send.svg";

import styles from "./ContactForm.module.scss";

export default function ContactForm() {
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
    if (!(formData.name && formData.email && formData.message && formData["h-captcha-response"])) {
      setSending(false);
      setStatus({ success: false, message: "Please make sure that all fields are filled in." });

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
      });
  };

  return (
    <form className={styles.form} onSubmit={onSubmit} action="/api/contact/" method="POST">
      <input type="text" name="name" placeholder="Name" required disabled={status.success} />
      <input type="email" name="email" placeholder="Email" required disabled={status.success} />
      <textarea name="message" placeholder="Write something..." required disabled={status.success} />

      <div className={styles.markdown_tip}>
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

      <div className={styles.captcha}>
        <HCaptcha
          sitekey={process.env.NEXT_PUBLIC_HCAPTCHA_SITE_KEY}
          size="normal"
          onVerify={() => true} // this is allegedly optional but a function undefined error is thrown without it
        />
      </div>

      <div className={styles.action_row}>
        <button
          className={styles.btn_submit}
          title="Send Message"
          aria-label="Send Message"
          disabled={sending}
          style={{ display: status.success ? "none" : null }}
        >
          {sending ? (
            <span>Sending...</span>
          ) : (
            <>
              <SendIcon className={styles.send_icon} /> <span>Send</span>
            </>
          )}
        </button>

        <span
          className={status.success ? styles.result_success : styles.result_error}
          style={{ display: !status.message || sending ? "none" : null }}
        >
          {status.success ? <CheckIcon size={16} /> : <XIcon size={16} />} {status.message}
        </span>
      </div>
    </form>
  );
}
