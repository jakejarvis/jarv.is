"use client";

import { cloneElement } from "react";
import { ActivityCalendar } from "react-activity-calendar";
import { Tooltip } from "react-tooltip";
import { format } from "date-fns";
import type { ComponentPropsWithoutRef } from "react";
import type { Activity } from "react-activity-calendar";
import { cn } from "@/lib/utils";

const Calendar = ({
  data,
  noun = "thing",
  className,
  ...rest
}: ComponentPropsWithoutRef<"div"> & {
  data: Activity[];
  noun?: string;
}) => {
  // heavily inspired by https://github.com/grubersjoe/react-github-calendar
  return (
    <div
      className={cn(
        String.raw`**:[.react-activity-calendar\_\_count,.react-activity-calendar\_\_legend-month,.react-activity-calendar\_\_legend-colors]:text-muted-foreground`,
        "[--activity-0:#ebedf0] [--activity-1:#9be9a8] [--activity-2:#40c463] [--activity-3:#30a14e] [--activity-4:#216e39]",
        "dark:[--activity-0:#252525] dark:[--activity-1:#033a16] dark:[--activity-2:#196c2e] dark:[--activity-3:#2ea043] dark:[--activity-4:#56d364]",
        className
      )}
      {...rest}
    >
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
          totalCount: `{{count}} ${noun}s in the last year`,
        }}
        maxLevel={4}
        renderBlock={(block, activity) =>
          cloneElement(block, {
            "data-tooltip-id": "activity-tooltip",
            "data-tooltip-html": `${activity.count === 0 ? "No" : activity.count} ${noun}${activity.count === 1 ? "" : "s"} on ${format(activity.date, "MMMM do")}`,
          })
        }
        fontSize={13}
      />

      <Tooltip id="activity-tooltip" />
    </div>
  );
};

export default Calendar;
