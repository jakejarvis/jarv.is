import { h, render } from "preact";

// react components:
import CopyButton from "./components/CopyButton.js";

// loop through each code fence on page (if any)
document.querySelectorAll("div.highlight").forEach((highlightDiv) => {
  // actual code element will have class "language-*" (even if plaintext)
  const codeElement = highlightDiv.querySelector('code[class^="language-"]');

  if (codeElement) {
    // add the button as a sibling to the original Hugo block whose contents we're copying
    render(<CopyButton content={codeElement.textContent} />, highlightDiv);
  }
});
