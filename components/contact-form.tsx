"use client";

import { useActionState, useState, useEffect } from "react";
import { useDebouncedCallback } from "use-debounce";
import { SendIcon, Loader2Icon, CheckIcon, XIcon } from "lucide-react";
import Form from "next/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { MarkdownIcon } from "@/components/icons";
import { cn } from "@/lib/utils";
import { send, type ContactState } from "@/lib/server/contact";
import { ContactSchema, type ContactInput } from "@/lib/schemas/contact";

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

  // keep track of which fields have been touched
  const [touched, setTouched] = useState<Record<keyof ContactInput, boolean>>({
    name: false,
    email: false,
    message: false,
  });

  // client-side validation using shared schema
  const [clientErrors, setClientErrors] = useState<Partial<Record<keyof ContactInput, string[]>>>({});

  const debouncedValidate = useDebouncedCallback(() => {
    const result = ContactSchema.safeParse(formFields);
    setClientErrors(result.success ? {} : result.error.flatten().fieldErrors);
  }, 150);

  useEffect(() => {
    debouncedValidate();
  }, [formFields, debouncedValidate]);

  const hasClientErrors = Object.values(clientErrors).some((errs) => (errs?.length || 0) > 0);

  const getErrorForField = (field: keyof ContactInput): string | undefined => {
    if (touched[field]) {
      return clientErrors[field]?.[0];
    }
    return formState.errors?.[field]?.[0];
  };

  const nameError = getErrorForField("name");
  const emailError = getErrorForField("email");
  const messageError = getErrorForField("message");

  return (
    <Form action={formAction} className="my-6 space-y-4">
      <div className="not-prose">
        <Input
          type="text"
          name="name"
          placeholder="Name"
          value={formFields.name}
          onChange={(e) => {
            setFormFields({ ...formFields, name: e.target.value });
            setTouched((t) => ({ ...t, name: true }));
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
            setTouched((t) => ({ ...t, email: true }));
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
            setTouched((t) => ({ ...t, message: true }));
          }}
          onBlur={() => setTouched((t) => ({ ...t, message: true }))}
          disabled={pending || formState.success}
          aria-invalid={messageError ? "true" : undefined}
          className="min-h-[6lh] resize-y"
        />
        {messageError && <span className="text-destructive text-[0.8rem] font-semibold">{messageError}</span>}

        <div className="text-foreground/85 my-2 text-[0.8rem] leading-relaxed">
          <MarkdownIcon className="mr-1.5 inline-block size-4 align-text-top" />
          Basic{" "}
          <a
            href="https://commonmark.org/help/"
            target="_blank"
            rel="noopener noreferrer"
            title="Markdown reference sheet"
            className="font-semibold"
          >
            Markdown syntax
          </a>{" "}
          is allowed here, e.g.: <strong>**bold**</strong>, <em>_italics_</em>, [
          <a href="https://jarv.is" target="_blank" rel="noopener" className="hover:no-underline">
            links
          </a>
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
              formState.success ? "text-green-600 dark:text-green-400" : "text-destructive"
            )}
          >
            {formState.success ? <CheckIcon className="inline size-4" /> : <XIcon className="inline size-4" />}{" "}
            <span>{formState.message}</span>
          </div>
        )}
      </div>
    </Form>
  );
};

export { ContactForm };
