import { Source_Code_Pro as SourceCodeProLoader } from "next/font/google";

const SourceCodePro = SourceCodeProLoader({
  weight: "variable",
  subsets: ["latin"],
  display: "fallback",
  preload: true,
});

export default SourceCodePro;
