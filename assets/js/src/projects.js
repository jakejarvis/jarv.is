import { h, render } from "preact";

// react components:
import RepositoryGrid from "./components/RepositoryGrid.js";

// detect if these cards are wanted on this page (only /projects)
if (typeof window !== "undefined" && document.querySelector(".layout-projects #github-cards")) {
  render(<RepositoryGrid />, document.querySelector(".layout-projects #github-cards"));
}
