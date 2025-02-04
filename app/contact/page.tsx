import Content from "../../components/Content";
import PageTitle from "../../components/PageTitle";
import Link from "../../components/Link";
import ContactForm from "../../components/ContactForm";
import type { Metadata, Route } from "next";

export const metadata: Metadata = {
  title: "Contact Me",
  openGraph: {
    title: "Contact Me",
  },
};

export default function Page() {
  return (
    <>
      <PageTitle>📬 Contact Me</PageTitle>

      <Content
        style={{
          maxWidth: "600px",
          margin: "0 auto",
        }}
      >
        <p>
          Fill out this quick form and I'll get back to you as soon as I can! You can also{" "}
          <Link href="mailto:jake@jarv.is">email me directly</Link>, send me a{" "}
          <Link href="https://fediverse.jarv.is/@jake">direct message on Mastodon</Link>, or{" "}
          <Link href="sms:+1-617-917-3737">text me</Link>.
        </p>
        <p>
          🔐 You can grab my public key here:{" "}
          <Link
            href={"/pubkey.asc" as Route}
            prefetch={false}
            title="My Public PGP Key"
            rel="pgpkey authn"
            openInNewTab
          >
            <code style={{ fontSize: "0.925em", letterSpacing: "0.075em", wordSpacing: "-0.3em" }}>
              6BF3 79D3 6F67 1480 2B0C 9CF2 51E6 9A39
            </code>
          </Link>
          .
        </p>

        <ContactForm />
      </Content>
    </>
  );
}
