import { siteLocale } from "../config";

// adds thousands separator
// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl/NumberFormat/NumberFormat
export const commafy = Intl.NumberFormat(siteLocale, { useGrouping: true }).format;
