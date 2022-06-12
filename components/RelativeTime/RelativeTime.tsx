import { useHasMounted } from "../../hooks/use-has-mounted";
import { formatDate, formatTimeAgo } from "../../lib/helpers/format-date";

export type RelativeTimeProps = {
  date: string | number | Date;
  verb?: string; // optional "Updated", "Published", "Created", etc.
  staticFormat?: string; // format for the placeholder/fallback before client-side renders the relative time
  className?: string;
};

const RelativeTime = ({ date, verb, staticFormat, className }: RelativeTimeProps) => {
  // play nice with SSR -- only use relative time on the client, since it'll quickly become outdated on the server and
  // cause a react hydration mismatch error.
  const hasMounted = useHasMounted();

  return (
    <time dateTime={formatDate(date)} title={formatDate(date, "MMM D, YYYY, h:mm A z")} className={className}>
      {verb && `${verb} `}
      {hasMounted ? formatTimeAgo(date, { suffix: true }) : `on ${formatDate(date, staticFormat)}`}
    </time>
  );
};

export default RelativeTime;
