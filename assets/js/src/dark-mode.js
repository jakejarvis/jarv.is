import { init } from "@jakejarvis/dark-mode";

init({
  toggle: document.querySelector(".dark-mode-toggle"),
  onInit: function (t) {
    // make toggle visible now that we know JS is enabled
    t.style.display = "block";
  },
});
