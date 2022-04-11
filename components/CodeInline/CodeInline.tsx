import Code from "../Code";
import { styled } from "../../lib/styles/stitches.config";

const CodeInline = styled(Code, {
  padding: "0.2em 0.3em",
  pageBreakInside: "avoid",
});

export default CodeInline;
