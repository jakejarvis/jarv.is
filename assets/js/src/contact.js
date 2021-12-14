import { h, render } from "preact";

// react components:
import ContactForm from "./components/ContactForm.js";

// don't continue if there isn't a contact form on this page
if (typeof window !== "undefined" && document.querySelector(".layout-contact #contact-form-wrapper")) {
  render(<ContactForm />, document.querySelector(".layout-contact #contact-form-wrapper"));
}
