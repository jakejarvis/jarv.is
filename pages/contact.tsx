import { NextSeo } from "next-seo";
import PageTitle from "../components/page/PageTitle";
import ContactForm from "../components/contact/ContactForm";
import { MailIcon, LockIcon } from "../components/icons";
import Content from "../components/Content";

const Contact = () => (
  <>
    <NextSeo
      title="Contact Me"
      openGraph={{
        title: "Contact Me",
      }}
    />

    <PageTitle>
      <MailIcon /> Contact Me
    </PageTitle>

    <Content>
      <div className="wrapper">
        <p>
          Fill out this quick form and I'll get back to you as soon as I can! You can also{" "}
          <a href="mailto:jake@jarv.is">email me directly</a>, send me a{" "}
          <a
            href="https://twitter.com/messages/compose?recipient_id=229769022"
            target="_blank"
            rel="noopener nofollow noreferrer"
          >
            direct message on Twitter
          </a>
          , or <a href="sms:+1-617-917-3737">text me</a>.
        </p>
        <p>
          <LockIcon /> You can grab my public key here:{" "}
          <a href="/pubkey.asc" title="My Public PGP Key" target="_blank" rel="pgpkey authn noopener">
            <code>6BF3 79D3 6F67 1480 2B0C 9CF2 51E6 9A39</code>
          </a>
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

      .wrapper code {
        background: none;
        border: 0;
        padding: 0;
        word-spacing: -0.175em;
        white-space: normal;
      }
    `}</style>
  </>
);

export default Contact;
