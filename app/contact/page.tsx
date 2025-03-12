import PageTitle from "../../components/PageTitle";
import Link from "../../components/Link";
import ContactForm from "./form";
import { metadata as defaultMetadata } from "../layout";
import type { Metadata, Route } from "next";

export const metadata: Metadata = {
  title: "Contact Me",
  description: "Fill out this quick form and I'll get back to you as soon as I can.",
  openGraph: {
    ...defaultMetadata.openGraph,
    title: "Contact Me",
    url: "/contact",
  },
  alternates: {
    ...defaultMetadata.alternates,
    canonical: "/contact",
  },
};

const Page = () => {
  return (
    <div
      style={{
        maxWidth: "600px",
        margin: "0 auto",
      }}
    >
      <PageTitle canonical="/contact">Contact</PageTitle>

      <p>
        Fill out this quick form and I'll get back to you as soon as I can! You can also{" "}
        <Link href="mailto:jake@jarv.is">email me directly</Link> or send me a{" "}
        <Link href="https://fediverse.jarv.is/@jake">direct message on Mastodon</Link>.
      </p>
      <p>
        🔐 You can grab my public key here:{" "}
        <Link href={"/pubkey.asc" as Route} title="My Public PGP Key" rel="pgpkey authn" openInNewTab>
          <code style={{ fontSize: "0.925em", letterSpacing: "0.075em", wordSpacing: "-0.3em" }}>
            6BF3 79D3 6F67 1480 2B0C 9CF2 51E6 9A39
          </code>
        </Link>
        .
      </p>

      <ContactForm />
    </div>
  );
};

export default Page;
