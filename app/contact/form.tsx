"use client";

import { useActionState } from "react";
import TextareaAutosize from "react-textarea-autosize";
import Turnstile from "react-turnstile";
import clsx from "clsx";
import Link from "../../components/Link";
import { sendMessage } from "./actions";
import { GoCheck, GoX } from "react-icons/go";
import { SiMarkdown } from "react-icons/si";

import styles from "./form.module.css";

const ContactForm = () => {
  const [formState, formAction, pending] = useActionState<Awaited<ReturnType<typeof sendMessage>>, FormData>(
    sendMessage,
    { success: false, message: "" }
  );

  return (
    <form action={formAction}>
      <input
        type="text"
        name="name"
        placeholder="Name"
        required
        className={clsx(styles.input, formState?.errors?.name && styles.invalid)}
        defaultValue={(formState?.payload?.get("name") || "") as string}
        disabled={formState?.success}
      />

      <input
        type="email"
        name="email"
        placeholder="Email"
        required
        inputMode="email"
        className={clsx(styles.input, formState?.errors?.email && styles.invalid)}
        defaultValue={(formState?.payload?.get("email") || "") as string}
        disabled={formState?.success}
      />

      <TextareaAutosize
        name="message"
        placeholder="Write something..."
        minRows={5}
        required
        className={clsx(styles.input, styles.textarea, formState?.errors?.message && styles.invalid)}
        defaultValue={(formState?.payload?.get("message") || "") as string}
        disabled={formState?.success}
      />

      <div
        style={{
          fontSize: "0.825em",
          lineHeight: 1.75,
        }}
      >
        <SiMarkdown
          style={{
            display: "inline",
            width: "1.25em",
            height: "1.25em",
            verticalAlign: "-0.25em",
            marginRight: "0.25em",
          }}
        />{" "}
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

      <div className={styles.actionRow}>
        {!formState?.success && (
          <button type="submit" disabled={pending} className={styles.submitButton}>
            {pending ? (
              <span>Sending...</span>
            ) : (
              <>
                <span className={styles.submitIcon}>📤</span> <span>Send</span>
              </>
            )}
          </button>
        )}

        {formState?.message && (
          <div className={clsx(styles.result, formState?.success ? styles.success : styles.error)}>
            {formState?.success ? <GoCheck className={styles.resultIcon} /> : <GoX className={styles.resultIcon} />}{" "}
            {formState?.message}
          </div>
        )}
      </div>
    </form>
  );
};

export default ContactForm;
