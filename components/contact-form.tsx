"use client";

import { useState } from "react";
import { useForm } from "@tanstack/react-form";
import { SendIcon, Loader2Icon, CheckIcon, XIcon } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Field, FieldLabel, FieldError } from "@/components/ui/field";
import { MarkdownIcon } from "@/components/icons";
import { cn } from "@/lib/utils";
import { sendContactForm, type ContactResult } from "@/lib/server/contact";
import { ContactSchema } from "@/lib/schemas/contact";

const ContactForm = () => {
  const [result, setResult] = useState<ContactResult | null>(null);

  const form = useForm({
    defaultValues: {
      name: "",
      email: "",
      message: "",
    },
    validators: {
      onBlur: ContactSchema,
    },
    onSubmit: async ({ value }) => {
      try {
        const formData = new FormData();
        formData.append("name", value.name);
        formData.append("email", value.email);
        formData.append("message", value.message);

        const response = await sendContactForm(formData);
        setResult(response);

        if (response.success) {
          form.reset();
        }
      } catch (error) {
        console.error("[contact-form] error:", error);
        setResult({
          success: false,
          message: "Something went wrong. Please try again.",
        });
      }
    },
  });

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        form.handleSubmit();
      }}
      className="my-5 space-y-4"
    >
      <form.Subscribe selector={(state) => state.isSubmitting || result?.success}>
        {(isDisabled) => (
          <>
            <form.Field name="name">
              {(field) => {
                const isInvalid = field.state.meta.isTouched && field.state.meta.errors.length > 0;
                return (
                  <Field data-invalid={isInvalid || undefined} className="gap-1.5">
                    <FieldLabel htmlFor="name">Name</FieldLabel>
                    <Input
                      id="name"
                      name="name"
                      type="text"
                      placeholder="Microsoft Bob"
                      autoComplete="name"
                      value={field.state.value}
                      onBlur={field.handleBlur}
                      onChange={(e) => field.handleChange(e.target.value)}
                      disabled={!!isDisabled}
                      aria-invalid={isInvalid || undefined}
                    />
                    {isInvalid && <FieldError errors={field.state.meta.errors} />}
                  </Field>
                );
              }}
            </form.Field>

            <form.Field name="email">
              {(field) => {
                const isInvalid = field.state.meta.isTouched && field.state.meta.errors.length > 0;
                return (
                  <Field data-invalid={isInvalid || undefined} className="gap-1.5">
                    <FieldLabel htmlFor="email">Email</FieldLabel>
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      inputMode="email"
                      placeholder="robert@hotmail.com"
                      autoComplete="email"
                      spellCheck={false}
                      value={field.state.value}
                      onBlur={field.handleBlur}
                      onChange={(e) => field.handleChange(e.target.value)}
                      disabled={!!isDisabled}
                      aria-invalid={isInvalid || undefined}
                    />
                    {isInvalid && <FieldError errors={field.state.meta.errors} />}
                  </Field>
                );
              }}
            </form.Field>

            <form.Field name="message">
              {(field) => {
                const isInvalid = field.state.meta.isTouched && field.state.meta.errors.length > 0;
                return (
                  <Field data-invalid={isInvalid || undefined} className="gap-1.5">
                    <FieldLabel htmlFor="message">Message</FieldLabel>
                    <Textarea
                      id="message"
                      name="message"
                      placeholder="Write something…"
                      value={field.state.value}
                      onBlur={field.handleBlur}
                      onChange={(e) => field.handleChange(e.target.value)}
                      disabled={!!isDisabled}
                      aria-invalid={isInvalid || undefined}
                      className="min-h-[6lh] resize-y"
                    />
                    {isInvalid && <FieldError errors={field.state.meta.errors} />}

                    <p className="text-foreground/85 mt-1.5 text-[0.8rem] leading-relaxed">
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
                      is allowed, e.g.: <strong>**bold**</strong>, <em>_italics_</em>, [
                      <a href="https://jarv.is" target="_blank" rel="noopener" className="hover:no-underline">
                        links
                      </a>
                      ](https://jarv.is), and <code>`code`</code>.
                    </p>
                  </Field>
                );
              }}
            </form.Field>
          </>
        )}
      </form.Subscribe>

      <div className="flex min-h-16 items-center space-x-4">
        <form.Subscribe selector={(state) => [, state.isSubmitting]}>
          {([isSubmitting]) => (
            <>
              {!result?.success && (
                <Button type="submit" size="lg" disabled={isSubmitting}>
                  {isSubmitting ? (
                    <>
                      <Loader2Icon className="animate-spin" aria-hidden="true" />
                      Sending…
                    </>
                  ) : (
                    <>
                      <SendIcon aria-hidden="true" />
                      Send
                    </>
                  )}
                </Button>
              )}

              {!isSubmitting && result?.message && (
                <div
                  role="status"
                  aria-live="polite"
                  className={cn(
                    "space-x-0.5 text-[0.9rem] font-semibold",
                    result.success ? "text-green-600 dark:text-green-400" : "text-destructive"
                  )}
                >
                  {result.success ? (
                    <CheckIcon className="inline size-4" aria-hidden="true" />
                  ) : (
                    <XIcon className="inline size-4" aria-hidden="true" />
                  )}{" "}
                  <span>{result.message}</span>
                </div>
              )}
            </>
          )}
        </form.Subscribe>
      </div>
    </form>
  );
};

export { ContactForm };
