"use client";

import { useState } from "react";
import { Formik, Form, Field } from "formik";
import TextareaAutosize from "react-textarea-autosize";
import clsx from "clsx";
import Link from "../Link";
import Captcha from "../Captcha";
import { GoCheck, GoX } from "react-icons/go";
import { SiMarkdown } from "react-icons/si";
import type { FormikHelpers, FormikProps, FieldInputProps, FieldMetaProps } from "formik";

import styles from "./ContactForm.module.css";

type FormValues = {
  name: string;
  email: string;
  message: string;
  "cf-turnstile-response": string;
};

export type ContactFormProps = {
  className?: string;
};

const ContactForm = ({ className }: ContactFormProps) => {
  // status/feedback:
  const [submitted, setSubmitted] = useState(false);
  const [success, setSuccess] = useState(false);
  const [feedback, setFeedback] = useState("");

  const handleSubmit = (values: FormValues, { setSubmitting }: FormikHelpers<FormValues>) => {
    // once a user attempts a submission, this is true and stays true whether or not the next attempt(s) are successful
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

        if (error.message === "missing_data") {
          // this should be validated client-side but it's also checked server-side just in case someone slipped past
          setFeedback("Please make sure that all fields are properly filled in.");
        } else if (error.message === "invalid_captcha") {
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
        "cf-turnstile-response": "",
      }}
      validate={(values: FormValues) => {
        const errors: Partial<Record<keyof FormValues, boolean>> = {};

        errors.name = !values.name;
        errors.email = !values.email; // also loosely validated that it's email-like via browser (not foolproof)
        errors.message = !values.message;
        errors["cf-turnstile-response"] = !values["cf-turnstile-response"];

        if (!errors.name && !errors.email && !errors.message && !errors["cf-turnstile-response"]) {
          setFeedback("");
          return {};
        } else {
          setSuccess(false);
          setFeedback("Please make sure that all fields are properly filled in.");
        }

        return errors;
      }}
    >
      {({ setFieldValue, isSubmitting }: FormikProps<FormValues>) => (
        <Form className={className} name="contact">
          <Field name="name">
            {({ field, meta }: { field: FieldInputProps<string>; meta: FieldMetaProps<string> }) => (
              <input
                type="text"
                placeholder="Name"
                disabled={success}
                className={clsx(styles.input, { [styles.missing]: !!(meta.error && meta.touched) })}
                {...field}
              />
            )}
          </Field>

          <Field name="email">
            {({ field, meta }: { field: FieldInputProps<string>; meta: FieldMetaProps<string> }) => (
              <input
                type="email"
                inputMode="email"
                placeholder="Email"
                disabled={success}
                className={clsx(styles.input, { [styles.missing]: !!(meta.error && meta.touched) })}
                {...field}
              />
            )}
          </Field>

          <Field name="message">
            {({ field, meta }: { field: FieldInputProps<string>; meta: FieldMetaProps<string> }) => (
              <TextareaAutosize
                placeholder="Write something..."
                minRows={5}
                disabled={success}
                className={clsx(styles.input, { [styles.missing]: !!(meta.error && meta.touched) })}
                {...field}
              />
            )}
          </Field>

          <div className={styles.markdownTip}>
            <SiMarkdown className={styles.markdownIcon} /> Basic{" "}
            <Link href="https://commonmark.org/help/" title="Markdown reference sheet" style={{ fontWeight: 600 }}>
              Markdown syntax
            </Link>{" "}
            is allowed here, e.g.: <strong>**bold**</strong>, <em>_italics_</em>, [
            <Link href="https://jarv.is" underline={false} openInNewTab>
              links
            </Link>
            ](https://jarv.is), and <code>`code`</code>.
          </div>

          <Captcha className={styles.captcha} onVerify={(token) => setFieldValue("cf-turnstile-response", token)} />

          <div className={styles.actionRow}>
            <button
              type="submit"
              title="Send Message"
              aria-label="Send Message"
              onClick={() => setSubmitted(true)}
              disabled={isSubmitting}
              className={styles.submitButton}
              style={{ display: success ? "none" : "inline-flex" }}
            >
              {isSubmitting ? (
                <span>Sending...</span>
              ) : (
                <>
                  <span className={styles.submitIcon}>📤</span> <span>Send</span>
                </>
              )}
            </button>

            <div
              className={clsx(styles.result, success ? styles.success : styles.error)}
              style={{ display: submitted && feedback && !isSubmitting ? "block" : "none" }}
            >
              {success ? <GoCheck className={styles.resultIcon} /> : <GoX className={styles.resultIcon} />} {feedback}
            </div>
          </div>
        </Form>
      )}
    </Formik>
  );
};

export default ContactForm;
