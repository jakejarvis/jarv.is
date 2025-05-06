"use client";

import { env } from "@/lib/env";
import { useActionState, useState } from "react";
import Turnstile from "react-turnstile";
import { SendIcon, Loader2Icon, CheckIcon, XIcon } from "lucide-react";
import Link from "@/components/link";
import Input from "@/components/ui/input";
import Textarea from "@/components/ui/textarea";
import Button from "@/components/ui/button";
import { cn } from "@/lib/utils";

import { send, type ContactState, type ContactInput } from "./action";

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
          disabled={pending || formState.success}
          aria-invalid={!pending && formState.errors?.name ? "true" : undefined}
        />
        {!pending && formState.errors?.name && (
          <span className="text-destructive text-[0.8rem] font-semibold">{formState.errors.name[0]}</span>
        )}
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
          disabled={pending || formState.success}
          aria-invalid={!pending && formState.errors?.email ? "true" : undefined}
        />
        {!pending && formState.errors?.email && (
          <span className="text-destructive text-[0.8rem] font-semibold">{formState.errors.email[0]}</span>
        )}
      </div>

      <div>
        <Textarea
          name="message"
          placeholder="Write something..."
          value={formFields.message}
          onChange={(e) => {
            setFormFields({ ...formFields, message: e.target.value });
          }}
          disabled={pending || formState.success}
          aria-invalid={!pending && formState.errors?.message ? "true" : undefined}
          className="min-h-[6lh] resize-y"
        />
        {!pending && formState.errors?.message && (
          <span className="text-destructive text-[0.8rem] font-semibold">{formState.errors.message[0]}</span>
        )}

        <div className="text-foreground/85 my-2 text-[0.8rem] leading-relaxed">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="currentColor"
            stroke="currentColor"
            strokeWidth="0"
            viewBox="0 0 24 24"
            className="mr-1 inline-block size-4 align-text-top"
          >
            <path d="M22.27 19.385H1.73A1.73 1.73 0 010 17.655V6.345a1.73 1.73 0 011.73-1.73h20.54A1.73 1.73 0 0124 6.345v11.308a1.73 1.73 0 01-1.73 1.731zM5.769 15.923v-4.5l2.308 2.885 2.307-2.885v4.5h2.308V8.078h-2.308l-2.307 2.885-2.308-2.885H3.46v7.847zM21.232 12h-2.309V8.077h-2.307V12h-2.308l3.461 4.039z" />
          </svg>{" "}
          Basic{" "}
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

      <div>
        <Turnstile sitekey={env.NEXT_PUBLIC_TURNSTILE_SITE_KEY} fixedSize />
        {!pending && formState.errors?.["cf-turnstile-response"] && (
          <span className="text-destructive text-[0.8rem] font-semibold">
            {formState.errors["cf-turnstile-response"][0]}
          </span>
        )}
      </div>

      <div className="flex min-h-16 items-center">
        {!formState.success && (
          <Button type="submit" size="lg" disabled={pending}>
            {pending ? (
              <>
                <Loader2Icon className="animate-spin" /> Sending...
              </>
            ) : (
              <>
                <SendIcon /> Send
              </>
            )}
          </Button>
        )}

        {!pending && formState.message && (
          <div
            className={cn(
              "ml-4 space-x-[2px] text-[0.9rem] font-semibold",
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
