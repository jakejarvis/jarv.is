import { siteLocale } from "../config";

// adds thousands separator
// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl/NumberFormat/NumberFormat
export const commafy = (number: number) => {
  if (typeof Intl !== "undefined" && typeof Intl.NumberFormat !== "undefined") {
    return new Intl.NumberFormat(siteLocale, { useGrouping: true }).format(number);
  } else {
    return number;
  }
};
