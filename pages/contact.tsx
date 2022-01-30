import { NextSeo } from "next-seo";
import Content from "../components/Content/Content";
import PageTitle from "../components/PageTitle/PageTitle";
import Link from "../components/Link/Link";
import ContactForm from "../components/ContactForm/ContactForm";

const Contact = () => (
  <>
    <NextSeo
      title="Contact Me"
      openGraph={{
        title: "Contact Me",
      }}
    />

    <PageTitle>📬 Contact Me</PageTitle>

    <Content>
      <div className="wrapper">
        <p>
          Fill out this quick form and I'll get back to you as soon as I can! You can also{" "}
          <Link href="mailto:jake@jarv.is">email me directly</Link>, send me a{" "}
          <Link href="https://twitter.com/messages/compose?recipient_id=229769022">direct message on Twitter</Link>, or{" "}
          <Link href="sms:+1-617-917-3737">text me</Link>.
        </p>
        <p>
          🔐 You can grab my public key here:{" "}
          <Link href="/pubkey.asc" title="My Public PGP Key" rel="pgpkey authn noopener" forceNewWindow>
            <code className="pubkey">6BF3 79D3 6F67 1480 2B0C 9CF2 51E6 9A39</code>
          </Link>
          .
        </p>

        <ContactForm />
      </div>
    </Content>

    <style jsx>{`
      .wrapper {
        max-width: 600px;
        margin: 0 auto;
      }

      .pubkey {
        font-size: 0.925em;
        word-spacing: -0.175em;
        white-space: normal;
      }
    `}</style>
  </>
);

export default Contact;
