import { NextSeo } from "next-seo";
import Content from "../components/Content";
import PageTitle from "../components/PageTitle";
import Link from "../components/Link";
import ContactForm from "../components/ContactForm";
import { styled } from "../lib/styles/stitches.config";

const PGPKey = styled("code", {
  fontSize: "0.925em",
  letterSpacing: "0.075em",
  wordSpacing: "-0.3em",
});

const Contact = () => {
  return (
    <>
      <NextSeo
        title="Contact Me"
        openGraph={{
          title: "Contact Me",
        }}
      />

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
          <Link href="/pubkey.asc" title="My Public PGP Key" rel="pgpkey authn" openInNewTab>
            <PGPKey>6BF3 79D3 6F67 1480 2B0C 9CF2 51E6 9A39</PGPKey>
          </Link>
          .
        </p>

        <ContactForm />
      </Content>
    </>
  );
};

export default Contact;
