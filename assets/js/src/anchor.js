import { h, render } from "preact";

// react components:
import Anchor from "./components/Anchor.js";

// loop through each h2, h3, h4 in this page's content area
// prettier-ignore
document.querySelectorAll([
  "div#content h2",
  "div#content h3",
  "div#content h4",
]).forEach((heading) => {
  // don't add to elements without a pre-existing ID (e.g. `<h2 id="...">`)
  if (!heading.hasAttribute("id")) {
    return;
  }

  // TODO: little hacky hack to make the anchor appear AFTER the existing h tag
  const linkTarget = document.createElement("a");
  heading.appendChild(linkTarget);

  render(<Anchor id={heading.getAttribute("id")} title={heading.textContent.trim()} />, heading, linkTarget);
});
