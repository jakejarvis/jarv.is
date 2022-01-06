import { useState } from "react";
import { useTheme } from "next-themes";
import { Formik, Form, Field } from "formik";
import HCaptcha from "@hcaptcha/react-hcaptcha";
import isEmailLike from "is-email-like";
import { SendIcon } from "../icons";
import { CheckOcticon, XOcticon } from "../icons/octicons";

import type { FormikHelpers } from "formik";

import styles from "./ContactForm.module.scss";

type Values = {
  name: string;
  email: string;
  message: string;
  "h-captcha-response": string;
};

const ContactForm = () => {
  const { resolvedTheme } = useTheme();

  // status/feedback:
  const [submitted, setSubmitted] = useState(false);
  const [success, setSuccess] = useState(null);
  const [feedback, setFeedback] = useState("");

  const handleSubmit = (values: Values, { setSubmitting }: FormikHelpers<Values>) => {
    setSubmitted(true);

    // if we've gotten here then all data is (or should be) valid and ready to post to API
    fetch("/api/contact/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify(values),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.success === true) {
          // handle successful submission
          // disable submissions, hide the send button, and let user know we were successful
          setSuccess(true);
          setFeedback("Thanks! You should hear from me soon.");
        } else {
          // pass on any error sent by the server to the catch block below
          throw new Error(data.message);
        }
      })
      .catch((error) => {
        setSuccess(false);

        if (error.message === "USER_MISSING_DATA") {
          // this should be validated client-side but it's also checked server-side just in case someone slipped past
          setFeedback("Please make sure that all fields are properly filled in.");
        } else if (error.message === "USER_INVALID_CAPTCHA") {
          // missing/invalid captcha
          setFeedback("Did you complete the CAPTCHA? (If you're human, that is...)");
        } else {
          // something else went wrong, and it's probably my fault...
          setFeedback("Internal server error... Try again later or shoot me an old-fashioned email?");
        }
      })
      .finally(() => setSubmitting(false));
  };

  return (
    <Formik
      onSubmit={handleSubmit}
      initialValues={{
        name: "",
        email: "",
        message: "",
        "h-captcha-response": "",
      }}
      validate={(values: Values) => {
        const errors: { name?: boolean; email?: boolean; message?: boolean; "h-captcha-response"?: boolean } = {};

        errors.name = !values.name;
        errors.email = !values.email || !isEmailLike(values.email); // also loosely validate email with regex (not foolproof)
        errors.message = !values.message;
        errors["h-captcha-response"] = !values["h-captcha-response"];

        if (!errors.name && !errors.email && !errors.message && !errors["h-captcha-response"]) {
          setFeedback("");
          return null;
        } else {
          setSuccess(false);
          setFeedback("Please make sure that all fields are properly filled in.");
        }

        return errors;
      }}
    >
      {({ setFieldValue, isSubmitting, touched, errors }) => (
        <Form className={styles.form} name="contact">
          <Field
            type="text"
            name="name"
            placeholder="Name"
            className={errors.name && touched.name ? styles.missing : undefined}
          />
          <Field
            type="text"
            name="email"
            placeholder="Email"
            className={errors.email && touched.email ? styles.missing : undefined}
          />
          <Field
            component="textarea"
            name="message"
            placeholder="Write something..."
            className={errors.message && touched.message ? styles.missing : undefined}
          />

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

          <div
            className={`${styles.hcaptcha} ${
              errors["h-captcha-response"] && touched["h-captcha-response"] ? styles.missing : undefined
            }`}
          >
            <HCaptcha
              sitekey={process.env.NEXT_PUBLIC_HCAPTCHA_SITE_KEY}
              size="normal"
              theme={resolvedTheme === "dark" ? "dark" : "light"}
              onVerify={(token) => setFieldValue("h-captcha-response", token)}
            />
          </div>

          <div className={styles.action_row}>
            <button
              className={styles.btn_submit}
              type="submit"
              title="Send Message"
              aria-label="Send Message"
              onClick={() => setSubmitted(true)}
              disabled={isSubmitting}
              style={{ display: success ? "none" : null }}
            >
              {isSubmitting ? (
                <span>Sending...</span>
              ) : (
                <>
                  <SendIcon className={`icon ${styles.send_icon}`} /> <span>Send</span>
                </>
              )}
            </button>

            <span
              className={success ? styles.result_success : styles.result_error}
              style={{ display: !submitted || !feedback || isSubmitting ? "none" : null }}
            >
              {success ? <CheckOcticon fill="CurrentColor" /> : <XOcticon fill="CurrentColor" />} {feedback}
            </span>
          </div>
        </Form>
      )}
    </Formik>
  );
};

export default ContactForm;

/*

      <form className={styles.form} onSubmit={handleSubmit} action="/api/contact/" method="POST">
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
            theme={resolvedTheme === "dark" ? "dark" : "light"}
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
            {status.success ? <CheckOcticon fill="CurrentColor" /> : <XOcticon fill="CurrentColor" />} {status.message}
          </span>
        </div>
      </form>
      */
