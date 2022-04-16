import { formatDistanceToNowStrict } from "date-fns";
import { formatInTimeZone } from "date-fns-tz";
import enUS from "date-fns/locale/en-US";
import { timeZone } from "../config";

export type FlexibleDate = string | number | Date;

// normalize timezone across the site, both server and client side, to prevent hydration errors.
// format defaults to "Apr 4, 2022, 3:04 PM EDT", see https://date-fns.org/v2.28.0/docs/format
export const formatDateTZ = (date: FlexibleDate, formatStr = "PPp zzz", options = {}) => {
  return formatInTimeZone(new Date(date), timeZone, formatStr, { locale: enUS, ...options });
};

// returns a timezone-less, machine-readable string.
export const formatDateISO = (date: FlexibleDate) => {
  return new Date(date).toISOString();
};

// returns "5 minutes ago", "1 year ago", etc.
export const formatTimeAgo = (date: FlexibleDate, options = {}) => {
  return formatDistanceToNowStrict(new Date(date), { addSuffix: true, locale: enUS, ...options });
};
