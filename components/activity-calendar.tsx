"use client";

import { ActivityCalendar, type Activity } from "react-activity-calendar";
import { formatDate } from "@/lib/date";
import { Tooltip, TooltipTrigger, TooltipContent } from "@/components/ui/tooltip";
import { cn } from "@/lib/utils";

const Calendar = ({
  data,
  noun = "thing",
  className,
  ...rest
}: React.ComponentProps<"div"> & {
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
        renderBlock={(block, activity) => (
          <Tooltip>
            <TooltipTrigger asChild>{block}</TooltipTrigger>
            <TooltipContent>
              <span className="text-[0.825rem] font-medium">{`${activity.count === 0 ? "No" : activity.count} ${noun}${activity.count === 1 ? "" : "s"} on ${formatDate(activity.date, "MMMM do")}`}</span>
            </TooltipContent>
          </Tooltip>
        )}
        fontSize={13}
      />
    </div>
  );
};

export default Calendar;
