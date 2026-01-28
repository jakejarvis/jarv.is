import PageTitle from "@/components/layout/page-title";
import Link from "@/components/link";
import ContactForm from "@/components/contact-form";
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
            <Link href="mailto:jake@jarv.is">email me directly</Link> or send me a direct message on{" "}
            <Link href="https://bsky.app/profile/jarv.is" className="text-nowrap">
              Bluesky
            </Link>{" "}
            or{" "}
            <Link href="https://fediverse.jarv.is/@jake" className="text-nowrap">
              Mastodon
            </Link>
            .
          </p>
          <p>
            You can grab my public key here:{" "}
            <Link
              href="https://jrvs.io/pgp"
              title="3BC6 E577 6BF3 79D3 6F67 1480 2B0C 9CF2 51E6 9A39"
              className="bg-muted relative rounded-sm px-[0.3rem] py-[0.2rem] font-mono text-sm font-medium tracking-wider [word-spacing:-0.25em]"
            >
              2B0C 9CF2 51E6 9A39
            </Link>
            .
          </p>
        </div>

        <ContactForm />
      </div>
    </>
  );
};

export default Page;
