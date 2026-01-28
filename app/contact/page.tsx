import { PageTitle } from "@/components/layout/page-title";
import { ContactForm } from "@/components/contact-form";
import { createMetadata } from "@/lib/metadata";

export const metadata = createMetadata({
  title: "Contact Me",
  description: "Fill out this quick form and I'll get back to you as soon as I can.",
  canonical: "/contact",
});

const Page = () => {
  return (
    <>
      <PageTitle canonical="/contact">Contact</PageTitle>

      <div className="w-full md:mx-auto md:w-2/3">
        <div className="prose prose-sm prose-neutral dark:prose-invert max-w-none">
          <p>
            Fill out this quick form and I&rsquo;ll get back to you as soon as I can! You can also{" "}
            <a href="mailto:jake@jarv.is">email me directly</a> or send me a direct message on{" "}
            <a href="https://bsky.app/profile/jarv.is" target="_blank" rel="noopener noreferrer">
              Bluesky
            </a>{" "}
            or{" "}
            <a href="https://fediverse.jarv.is/@jake" target="_blank" rel="noopener noreferrer">
              Mastodon
            </a>
            .
          </p>
          <p>
            You can grab my public key here:{" "}
            <a
              href="https://jrvs.io/pgp"
              target="_blank"
              rel="noopener"
              title="3BC6 E577 6BF3 79D3 6F67 1480 2B0C 9CF2 51E6 9A39"
              className="bg-muted relative rounded-sm px-[0.3rem] py-[0.2rem] font-mono text-sm font-medium tracking-wider [word-spacing:-0.25em]"
            >
              2B0C 9CF2 51E6 9A39
            </a>
            .
          </p>
        </div>

        <ContactForm />
      </div>
    </>
  );
};

export default Page;
