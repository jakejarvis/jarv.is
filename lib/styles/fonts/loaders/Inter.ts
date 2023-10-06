import { Inter as InterLoader } from "next/font/google";

const Inter = InterLoader({
  weight: "variable",
  axes: ["slnt"], // workaround for lack of italicized Inter on Google Fonts, see: https://github.com/google/fonts/issues/2386#issuecomment-691503098
  subsets: ["latin"],
  display: "fallback",
  preload: true,
});

export default Inter;
