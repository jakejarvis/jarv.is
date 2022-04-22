import { useHasMounted } from "../../hooks/use-has-mounted";
import { formatDateTZ, formatDateISO, formatTimeAgo, FlexibleDate } from "../../lib/helpers/format-date";

export type RelativeTimeProps = {
  date: FlexibleDate;
  prefix?: string; // optional "Updated", "Published", "Created", etc.
  staticFormat?: string; // full date (without timestamp)
  className?: string;
};

const RelativeTime = ({ date, prefix, staticFormat = "PP", className }: RelativeTimeProps) => {
  // play nice with SSR -- only use relative time on the client, since it'll quickly become outdated on the server and
  // cause a react hydration mismatch error.
  const hasMounted = useHasMounted();

  return (
    <time dateTime={formatDateISO(date)} title={formatDateTZ(date)} className={className}>
      {prefix && `${prefix} `}
      {hasMounted ? formatTimeAgo(date) : `on ${formatDateTZ(date, staticFormat)}`}
    </time>
  );
};

export default RelativeTime;
