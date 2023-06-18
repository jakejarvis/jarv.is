import { Inter as InterLoader } from "next/font/google";

const Inter = InterLoader({
  weight: "variable",
  subsets: ["latin"],
  display: "fallback",
  preload: true,
});

export default Inter;
