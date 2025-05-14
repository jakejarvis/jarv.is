import { env } from "@/lib/env";
import { format, formatISO } from "date-fns";
import { enUS } from "date-fns/locale";
import { tz } from "@date-fns/tz";
import { utc } from "@date-fns/utc";

export const formatDate = (date: string | number | Date, formatStr = "PPpp") => {
  return format(date, formatStr, { in: tz(env.NEXT_PUBLIC_SITE_TZ), locale: enUS });
};

export const formatDateISO = (date: string | number | Date) => {
  return formatISO(date, { in: utc });
};
