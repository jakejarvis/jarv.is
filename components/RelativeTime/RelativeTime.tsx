import { useHasMounted } from "../../hooks/use-has-mounted";
import { formatDateTZ, formatDateISO, formatTimeAgo, FlexibleDate } from "../../lib/helpers/format-date";

export type RelativeTimeProps = {
  date: FlexibleDate;
  className?: string;
};

const RelativeTime = ({ date, className }: RelativeTimeProps) => {
  // play nice with SSR -- only use relative time on the client, since it'll quickly become outdated on the server and
  // cause a react hydration mismatch error.
  const hasMounted = useHasMounted();

  return (
    <time dateTime={formatDateISO(date)} title={formatDateTZ(date)} className={className}>
      Updated {hasMounted ? formatTimeAgo(date) : `on ${formatDateTZ(date, "PP")}`}
    </time>
  );
};

export default RelativeTime;
