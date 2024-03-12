import dayjs from "dayjs";
import dayjsUtc from "dayjs/plugin/utc";
import dayjsTimezone from "dayjs/plugin/timezone";
import dayjsRelativeTime from "dayjs/plugin/relativeTime";
import dayjsLocalizedFormat from "dayjs/plugin/localizedFormat";
import dayjsAdvancedFormat from "dayjs/plugin/advancedFormat";
import "dayjs/locale/en";
import config from "../config";

const IsomorphicDayJs = (date?: dayjs.ConfigType): dayjs.Dayjs => {
  // plugins
  dayjs.extend(dayjsUtc);
  dayjs.extend(dayjsTimezone);
  dayjs.extend(dayjsRelativeTime);
  dayjs.extend(dayjsLocalizedFormat);
  dayjs.extend(dayjsAdvancedFormat);

  return dayjs(date).locale("en").tz(config.timeZone).clone();
};

// simple wrapper around dayjs.format() to normalize timezone across the site, both server and client side, to prevent
// hydration errors by returning an instance of dayjs with these defaults set.
// date defaults to now, format defaults to ISO 8601 (e.g. 2022-04-07T21:53:33-04:00)
export const formatDate = (date?: dayjs.ConfigType, formatStr?: string): string => {
  return IsomorphicDayJs(date).format(formatStr);
};

// returns the human-friendly difference between now and given date (e.g. "5 minutes", "9 months", etc.)
// set `{ suffix: true }` to include the "... ago" or "in ..." for past/future
export const formatTimeAgo = (date: dayjs.ConfigType, options?: { suffix?: boolean }): string => {
  return IsomorphicDayJs().isBefore(date)
    ? IsomorphicDayJs(date).toNow(!options?.suffix)
    : IsomorphicDayJs(date).fromNow(!options?.suffix);
};
