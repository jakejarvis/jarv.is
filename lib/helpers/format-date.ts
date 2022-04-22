import dayjs from "dayjs";
import dayjsUtc from "dayjs/plugin/utc";
import dayjsTimezone from "dayjs/plugin/timezone";
import dayjsRelativeTime from "dayjs/plugin/relativeTime";
import dayjsLocalizedFormat from "dayjs/plugin/localizedFormat";
import dayjsAdvancedFormat from "dayjs/plugin/advancedFormat";
import "dayjs/locale/en";
import { timeZone } from "../config";

const IsomorphicDayJs = (date?: dayjs.ConfigType): dayjs.Dayjs => {
  // plugins
  dayjs.extend(dayjsUtc);
  dayjs.extend(dayjsTimezone);
  dayjs.extend(dayjsRelativeTime);
  dayjs.extend(dayjsLocalizedFormat);
  dayjs.extend(dayjsAdvancedFormat);

  // defaults
  dayjs.locale("en");
  dayjs.tz.setDefault(timeZone);

  return dayjs(date);
};

// normalize timezone across the site, both server and client side, to prevent hydration errors.
// format defaults to "Apr 4, 2022, 3:04 PM EDT", see https://day.js.org/docs/en/parse/string-format#list-of-all-available-parsing-tokens
export const formatDate = (date?: dayjs.ConfigType, formatStr = "MMM D, YYYY, h:mm A z") => {
  return IsomorphicDayJs(date).tz(timeZone).format(formatStr);
};

// returns a timezone-less, machine-readable string.
export const formatDateISO = (date?: dayjs.ConfigType) => {
  return IsomorphicDayJs(date).toISOString();
};

// returns "5 minutes ago", "1 year ago", "in 9 months", etc.
// set `suffix = false` to exclude the "in" or "ago"
export const formatTimeAgo = (date: dayjs.ConfigType, suffix = true) => {
  return IsomorphicDayJs().isBefore(date)
    ? IsomorphicDayJs(date).toNow(!suffix)
    : IsomorphicDayJs(date).fromNow(!suffix);
};
