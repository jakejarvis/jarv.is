"use client";

import { useActionState, useEffect, useState } from "react";
import { SendIcon, Loader2Icon, CheckIcon, XIcon } from "lucide-react";
import Link from "@/components/link";
import Input from "@/components/ui/input";
import Textarea from "@/components/ui/textarea";
import Button from "@/components/ui/button";
import { MarkdownIcon } from "@/components/icons";
import { cn } from "@/lib/utils";
import { send, type ContactState } from "@/lib/server/resend";
import { ContactSchema, type ContactInput } from "@/lib/validation/contact";

const ContactForm = () => {
  const [formState, formAction, pending] = useActionState<ContactState, FormData>(send, {
    success: false,
    message: "",
  });

  // keep track of input so we can repopulate the fields if the form fails
  const [formFields, setFormFields] = useState<ContactInput>({
    name: "",
    email: "",
    message: "",
  });

  // client-side validation using shared schema
  const [clientErrors, setClientErrors] = useState<Partial<Record<keyof ContactInput, string[]>>>({});
  const [touched, setTouched] = useState<{ name: boolean; email: boolean; message: boolean }>({
    name: false,
    email: false,
    message: false,
  });

  useEffect(() => {
    const id = setTimeout(() => {
      const result = ContactSchema.safeParse(formFields);
      setClientErrors(result.success ? {} : result.error.flatten().fieldErrors);
    }, 200);
    return () => clearTimeout(id);
  }, [formFields]);

  const hasClientErrors = Object.values(clientErrors).some((errs) => (errs?.length || 0) > 0);

  const nameError = (touched.name ? clientErrors.name?.[0] : undefined) ?? formState.errors?.name?.[0];
  const emailError = (touched.email ? clientErrors.email?.[0] : undefined) ?? formState.errors?.email?.[0];
  const messageError = (touched.message ? clientErrors.message?.[0] : undefined) ?? formState.errors?.message?.[0];

  return (
    <form action={formAction} className="my-6 space-y-4">
      <div>
        <Input
          type="text"
          name="name"
          placeholder="Name"
          value={formFields.name}
          onChange={(e) => {
            setFormFields({ ...formFields, name: e.target.value });
          }}
          onBlur={() => setTouched((t) => ({ ...t, name: true }))}
          disabled={pending || formState.success}
          aria-invalid={nameError ? "true" : undefined}
        />
        {nameError && <span className="text-destructive text-[0.8rem] font-semibold">{nameError}</span>}
      </div>

      <div>
        <Input
          type="email"
          name="email"
          placeholder="Email"
          inputMode="email"
          value={formFields.email}
          onChange={(e) => {
            setFormFields({ ...formFields, email: e.target.value });
          }}
          onBlur={() => setTouched((t) => ({ ...t, email: true }))}
          disabled={pending || formState.success}
          aria-invalid={emailError ? "true" : undefined}
        />
        {emailError && <span className="text-destructive text-[0.8rem] font-semibold">{emailError}</span>}
      </div>

      <div>
        <Textarea
          name="message"
          placeholder="Write something..."
          value={formFields.message}
          onChange={(e) => {
            setFormFields({ ...formFields, message: e.target.value });
          }}
          onBlur={() => setTouched((t) => ({ ...t, message: true }))}
          disabled={pending || formState.success}
          aria-invalid={messageError ? "true" : undefined}
          className="min-h-[6lh] resize-y"
        />
        {messageError && <span className="text-destructive text-[0.8rem] font-semibold">{messageError}</span>}

        <div className="text-foreground/85 my-2 text-[0.8rem] leading-relaxed">
          <MarkdownIcon className="mr-1.5 inline-block size-4 align-text-top" /> Basic{" "}
          <Link href="https://commonmark.org/help/" title="Markdown reference sheet" className="font-semibold">
            Markdown syntax
          </Link>{" "}
          is allowed here, e.g.: <strong>**bold**</strong>, <em>_italics_</em>, [
          <Link href="https://jarv.is" className="hover:no-underline">
            links
          </Link>
          ](https://jarv.is), and <code>`code`</code>.
        </div>
      </div>

      <div className="flex min-h-16 items-center space-x-4">
        {!formState.success && (
          <Button type="submit" size="lg" disabled={pending || hasClientErrors}>
            {pending ? (
              <>
                <Loader2Icon className="animate-spin" />
                Sending...
              </>
            ) : (
              <>
                <SendIcon />
                Send
              </>
            )}
          </Button>
        )}

        {!pending && formState.message && (
          <div
            className={cn(
              "space-x-0.5 text-[0.9rem] font-semibold",
              formState.success ? "text-success" : "text-destructive"
            )}
          >
            {formState.success ? <CheckIcon className="inline size-4" /> : <XIcon className="inline size-4" />}{" "}
            <span>{formState.message}</span>
          </div>
        )}
      </div>
    </form>
  );
};

export default ContactForm;
