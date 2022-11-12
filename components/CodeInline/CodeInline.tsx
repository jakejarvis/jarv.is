import Code from "../Code";
import { styled } from "../../lib/styles/stitches.config";

const CodeInline = styled(Code, {
  padding: "0.175em 0.3em",
  fontSize: "0.975em",
  pageBreakInside: "avoid",
});

export default CodeInline;
