"use client";

import { useActionState, useState } from "react";
import TextareaAutosize from "react-textarea-autosize";
import Turnstile from "react-turnstile";
import clsx from "clsx";
import { CheckIcon, XIcon } from "lucide-react";
import Link from "../../components/Link";

import { send, type ContactState, type ContactInput } from "./action";

import styles from "./form.module.css";

const ContactForm = () => {
  const [formState, formAction, pending] = useActionState<ContactState, FormData>(send, {
    success: false,
    message: "",
  });

  // keep track of input so we can repopulate the fields if the form fails
  const [formFields, setFormFields] = useState<Partial<ContactInput>>({
    name: "",
    email: "",
    message: "",
  });

  return (
    <form action={formAction}>
      <input
        type="text"
        name="name"
        placeholder="Name"
        value={formFields.name}
        onChange={(e) => {
          setFormFields({ ...formFields, name: e.target.value });
        }}
        disabled={pending || formState.success}
        className={clsx(styles.input, !pending && formState.errors?.name && styles.invalid)}
      />
      {!pending && formState.errors?.name && <span className={styles.errorMessage}>{formState.errors.name[0]}</span>}

      <input
        type="email"
        name="email"
        placeholder="Email"
        inputMode="email"
        value={formFields.email}
        onChange={(e) => {
          setFormFields({ ...formFields, email: e.target.value });
        }}
        disabled={pending || formState.success}
        className={clsx(styles.input, !pending && formState.errors?.email && styles.invalid)}
      />
      {!pending && formState.errors?.email && <span className={styles.errorMessage}>{formState.errors.email[0]}</span>}

      <TextareaAutosize
        name="message"
        placeholder="Write something..."
        minRows={5}
        value={formFields.message}
        onChange={(e) => {
          setFormFields({ ...formFields, message: e.target.value });
        }}
        disabled={pending || formState.success}
        className={clsx(styles.input, styles.textarea, !pending && formState.errors?.message && styles.invalid)}
      />
      {!pending && formState.errors?.message && (
        <span className={styles.errorMessage}>{formState.errors.message[0]}</span>
      )}

      <div
        style={{
          fontSize: "0.825em",
          lineHeight: 1.75,
        }}
      >
        <svg
          fill="currentColor"
          stroke="currentColor"
          strokeWidth="0"
          viewBox="0 0 24 24"
          height="1.25em"
          width="1.25em"
          style={{
            display: "inline",
            width: "1.25em",
            height: "1.25em",
            verticalAlign: "-0.25em",
            marginRight: "0.25em",
          }}
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M22.27 19.385H1.73A1.73 1.73 0 010 17.655V6.345a1.73 1.73 0 011.73-1.73h20.54A1.73 1.73 0 0124 6.345v11.308a1.73 1.73 0 01-1.73 1.731zM5.769 15.923v-4.5l2.308 2.885 2.307-2.885v4.5h2.308V8.078h-2.308l-2.307 2.885-2.308-2.885H3.46v7.847zM21.232 12h-2.309V8.077h-2.307V12h-2.308l3.461 4.039z" />
        </svg>{" "}
        Basic{" "}
        <Link href="https://commonmark.org/help/" title="Markdown reference sheet" style={{ fontWeight: 600 }}>
          Markdown syntax
        </Link>{" "}
        is allowed here, e.g.: <strong>**bold**</strong>, <em>_italics_</em>, [
        <Link href="https://jarv.is" plain>
          links
        </Link>
        ](https://jarv.is), and <code>`code`</code>.
      </div>

      <div style={{ margin: "1em 0" }}>
        <Turnstile sitekey={process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY || "1x00000000000000000000AA"} fixedSize />
      </div>
      {!pending && formState.errors?.["cf-turnstile-response"] && (
        <span className={styles.errorMessage}>{formState.errors["cf-turnstile-response"][0]}</span>
      )}

      <div className={styles.actionRow}>
        {!formState.success && (
          <button type="submit" disabled={pending} className={styles.submitButton}>
            {pending ? (
              <span>Sending...</span>
            ) : (
              <>
                <span
                  style={{
                    fontSize: "1.3em",
                    marginRight: "0.3em",
                    lineHeight: "1",
                  }}
                >
                  📤
                </span>{" "}
                <span>Send</span>
              </>
            )}
          </button>
        )}
        {!pending && formState.message && (
          <div className={clsx(styles.result, formState.success ? styles.success : styles.error)}>
            {formState.success ? (
              <CheckIcon size="1.3em" className={styles.resultIcon} />
            ) : (
              <XIcon size="1.3em" className={styles.resultIcon} />
            )}{" "}
            {formState.message}
          </div>
        )}
      </div>
    </form>
  );
};

export default ContactForm;
