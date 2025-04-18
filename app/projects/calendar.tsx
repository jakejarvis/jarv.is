"use client";

import { cloneElement } from "react";
import { ActivityCalendar } from "react-activity-calendar";
import { Tooltip } from "react-tooltip";
import clsx from "clsx";
import { format } from "date-fns";
import type { ComponentPropsWithoutRef } from "react";
import type { Activity } from "react-activity-calendar";

import styles from "./calendar.module.css";
import "react-tooltip/dist/react-tooltip.css";

export type CalendarProps = ComponentPropsWithoutRef<"div"> & {
  data: Activity[];
};

const Calendar = ({ data, className, ...rest }: CalendarProps) => {
  // heavily inspired by https://github.com/grubersjoe/react-github-calendar
  return (
    <div className={clsx(styles.calendar, className)} {...rest}>
      <ActivityCalendar
        data={data}
        colorScheme="dark"
        theme={{
          // this isn't actually locked to dark mode, we just take over theming using CSS like everywhere else
          dark: [
            "var(--activity-0)",
            "var(--activity-1)",
            "var(--activity-2)",
            "var(--activity-3)",
            "var(--activity-4)",
          ],
        }}
        labels={{
          totalCount: "{{count}} contributions in the last year",
        }}
        maxLevel={4}
        renderBlock={(block, activity) =>
          cloneElement(block, {
            "data-tooltip-id": "activity-tooltip",
            "data-tooltip-html": `${activity.count === 0 ? "No" : activity.count} contribution${activity.count === 1 ? "" : "s"} on ${format(activity.date, "MMMM do")}`,
          })
        }
        fontSize={13}
      />

      <Tooltip id="activity-tooltip" className={styles.tooltip} />
    </div>
  );
};

export default Calendar;
