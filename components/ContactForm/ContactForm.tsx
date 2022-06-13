import { useState } from "react";
import { Formik, Form, Field } from "formik";
import TextareaAutosize from "react-textarea-autosize";
import Link from "../Link";
import Captcha from "../Captcha";
import { CheckOcticon, XOcticon, MarkdownIcon } from "../Icons";
import { styled, css } from "../../lib/styles/stitches.config";
import type { FormikHelpers, FormikProps, FieldInputProps, FieldMetaProps } from "formik";

// CSS applied to both `<input />` and `<textarea />`
const InputStyles = css({
  width: "100%",
  padding: "0.8em",
  margin: "0.6em 0",
  border: "2px solid $light",
  borderRadius: "$rounded",
  color: "$text",
  backgroundColor: "$superDuperLight",

  // light-dark theme switch fading
  transition: "background 0.25s ease",

  "&:focus": {
    outline: "none",
    borderColor: "$link",
  },

  variants: {
    missing: {
      true: {
        borderColor: "$error",
      },
      false: {},
    },
  },
});

const Input = styled("input", InputStyles);

const TextArea = styled(TextareaAutosize, InputStyles, {
  marginBottom: 0,
  lineHeight: 1.5,
  minHeight: "10em",
  resize: "vertical",
});

const MarkdownTip = styled("div", {
  fontSize: "0.825em",
  lineHeight: 1.75,
});

const MarkdownTipIcon = styled(MarkdownIcon, {
  fill: "currentColor",
  width: "1.25em",
  height: "1.25em",
  verticalAlign: "-0.25em",
  marginRight: "0.25em",
});

const HCaptcha = styled(Captcha, {
  margin: "1em 0",
});

const ActionRow = styled("div", {
  display: "flex",
  alignItems: "center",
  minHeight: "3.75em",
});

const SubmitButton = styled("button", {
  flexShrink: 0,
  height: "3.25em",
  padding: "1em 1.25em",
  marginRight: "1.5em",
  border: 0,
  borderRadius: "$rounded",
  cursor: "pointer",
  userSelect: "none",
  fontWeight: 500,
  color: "$text",
  backgroundColor: "$kindaLight",

  "&:hover": {
    color: "$superDuperLight",
    backgroundColor: "$link",
  },

  variants: {
    hidden: {
      true: {
        display: "none",
      },
      false: {},
    },
  },
});

const SubmitIcon = styled("span", {
  fontSize: "1.3em",
  marginRight: "0.3em",
  lineHeight: 1,
});

const Result = styled("div", {
  fontWeight: 600,
  lineHeight: 1.5,

  variants: {
    status: {
      success: {
        color: "$success",
      },
      error: {
        color: "$error",
      },
    },

    hidden: {
      true: {
        display: "none",
      },
      false: {},
    },
  },
});

const ResultIcon = styled("svg", {
  width: "1.3em",
  height: "1.3em",
  verticalAlign: "-0.3em",
  fill: "currentColor",
});

type FormValues = {
  name: string;
  email: string;
  message: string;
  "h-captcha-response": string;
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
      validate={(values: FormValues) => {
        const errors: Partial<Record<keyof FormValues, boolean>> = {};

        errors.name = !values.name;
        errors.email = !values.email; // also loosely validated that it's email-like via browser (not foolproof)
        errors.message = !values.message;
        errors["h-captcha-response"] = !values["h-captcha-response"];

        if (!errors.name && !errors.email && !errors.message && !errors["h-captcha-response"]) {
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
              <Input
                type="text"
                placeholder="Name"
                disabled={success}
                missing={!!(meta.error && meta.touched)}
                {...field}
              />
            )}
          </Field>

          <Field name="email">
            {({ field, meta }: { field: FieldInputProps<string>; meta: FieldMetaProps<string> }) => (
              <Input
                type="email"
                inputMode="email"
                placeholder="Email"
                disabled={success}
                missing={!!(meta.error && meta.touched)}
                {...field}
              />
            )}
          </Field>

          <Field name="message">
            {({ field, meta }: { field: FieldInputProps<string>; meta: FieldMetaProps<string> }) => (
              <TextArea
                placeholder="Write something..."
                minRows={5}
                disabled={success}
                missing={!!(meta.error && meta.touched)}
                {...field}
              />
            )}
          </Field>

          <MarkdownTip>
            <MarkdownTipIcon /> Basic{" "}
            <Link href="https://commonmark.org/help/" title="Markdown reference sheet" css={{ fontWeight: 600 }}>
              Markdown syntax
            </Link>{" "}
            is allowed here, e.g.: <strong>**bold**</strong>, <em>_italics_</em>, [
            <Link href="https://jarv.is" underline={false} openInNewTab>
              links
            </Link>
            ](https://jarv.is), and <code>`code`</code>.
          </MarkdownTip>

          <HCaptcha onVerify={(token) => setFieldValue("h-captcha-response", token)} />

          <ActionRow>
            <SubmitButton
              type="submit"
              title="Send Message"
              aria-label="Send Message"
              onClick={() => setSubmitted(true)}
              disabled={isSubmitting}
              hidden={success}
            >
              {isSubmitting ? (
                <span>Sending...</span>
              ) : (
                <>
                  <SubmitIcon>📤</SubmitIcon> <span>Send</span>
                </>
              )}
            </SubmitButton>

            <Result status={success ? "success" : "error"} hidden={!submitted || !feedback || isSubmitting}>
              <ResultIcon as={success ? CheckOcticon : XOcticon} /> {feedback}
            </Result>
          </ActionRow>
        </Form>
      )}
    </Formik>
  );
};

export default ContactForm;
