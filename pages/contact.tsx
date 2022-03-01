import { NextSeo } from "next-seo";
import Content from "../components/Content/Content";
import PageTitle from "../components/PageTitle/PageTitle";
import Link from "../components/Link/Link";
import ContactForm from "../components/ContactForm/ContactForm";
import { styled } from "../lib/styles/stitches.config";

const Wrapper = styled(Content, {
  maxWidth: "600px",
  margin: "0 auto",
});

const PubKey = styled("code", {
  fontSize: "0.925em",
  wordSpacing: "-0.175em",
  whiteSpace: "normal",
});

const Contact = () => (
  <>
    <NextSeo
      title="Contact Me"
      openGraph={{
        title: "Contact Me",
      }}
    />

    <PageTitle>📬 Contact Me</PageTitle>

    <Wrapper>
      <p>
        Fill out this quick form and I'll get back to you as soon as I can! You can also{" "}
        <Link href="mailto:jake@jarv.is">email me directly</Link>, send me a{" "}
        <Link href="https://twitter.com/messages/compose?recipient_id=229769022">direct message on Twitter</Link>, or{" "}
        <Link href="sms:+1-617-917-3737">text me</Link>.
      </p>
      <p>
        🔐 You can grab my public key here:{" "}
        <Link href="/pubkey.asc" title="My Public PGP Key" rel="pgpkey authn noopener" forceNewWindow>
          <PubKey>6BF3 79D3 6F67 1480 2B0C 9CF2 51E6 9A39</PubKey>
        </Link>
        .
      </p>

      <ContactForm />
    </Wrapper>
  </>
);

export default Contact;
