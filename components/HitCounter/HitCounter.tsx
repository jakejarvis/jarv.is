import useSWR from "swr";
import commaNumber from "comma-number";
import Loading from "../Loading";
import fetcher from "../../lib/helpers/fetcher";

export type HitCounterProps = {
  slug: string;
  className?: string;
};

const HitCounter = ({ slug, className }: HitCounterProps) => {
  // start fetching repos from API immediately
  const { data, error } = useSWR(
    `/api/hits/?${new URLSearchParams({
      slug,
    })}`,
    fetcher,
    {
      // avoid double (or more) counting views
      revalidateOnFocus: false,
      revalidateOnReconnect: false,
    }
  );

  // show spinning loading indicator if data isn't fetched yet
  if (!data) {
    return <Loading boxes={3} width={20} />;
  }

  // fail secretly
  if (error) {
    return null;
  }

  // we have data!
  return (
    <span title={`${commaNumber(data.hits)} ${data.hits === 1 ? "view" : "views"}`} className={className}>
      {commaNumber(data.hits)}
    </span>
  );
};

export default HitCounter;
