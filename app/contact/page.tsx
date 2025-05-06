import PageTitle from "@/components/layout/page-title";
import Link from "@/components/link";
import { createMetadata } from "@/lib/metadata";

import ContactForm from "./form";

export const metadata = createMetadata({
  title: "Contact Me",
  description: "Fill out this quick form and I'll get back to you as soon as I can.",
  canonical: "/contact",
});

const Page = () => {
  return (
    <div className="w-full md:mx-auto md:w-2/3">
      <PageTitle canonical="/contact">Contact</PageTitle>

      <p className="my-5 text-[0.925rem] leading-relaxed md:text-base">
        Fill out this quick form and I&rsquo;ll get back to you as soon as I can! You can also{" "}
        <Link href="mailto:jake@jarv.is">email me directly</Link> or send me a direct message on{" "}
        <Link href="https://bsky.app/profile/jarv.is">🦋 Bluesky</Link> or{" "}
        <Link href="https://fediverse.jarv.is/@jake">🦣 Mastodon</Link>.
      </p>
      <p className="my-5 text-[0.925rem] leading-relaxed md:text-base">
        You can grab my public key here:{" "}
        <Link
          href="https://jrvs.io/pgp"
          className="bg-muted relative rounded-sm px-[0.3rem] py-[0.2rem] font-mono text-sm font-medium tracking-wider [word-spacing:-0.3em]"
        >
          6BF3 79D3 6F67 1480 2B0C 9CF2 51E6 9A39
        </Link>
        .
      </p>

      <ContactForm />
    </div>
  );
};

export default Page;
