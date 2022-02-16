import useSWR from "swr";
import Loading from "../Loading/Loading";
import { fetcher } from "../../lib/fetcher";

export type HitCounterProps = {
  slug: string;
  className?: string;
};

const HitCounter = ({ slug, className }: HitCounterProps) => {
  // start fetching repos from API immediately
  const { data, error } = useSWR(`/api/hits/?slug=${encodeURIComponent(slug)}`, fetcher, {
    // avoid double (or more) counting views
    revalidateOnFocus: false,
  });

  try {
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
      <span title={`${data.hits.toLocaleString("en-US")} ${data.hits === 1 ? "view" : "views"}`} className={className}>
        {data.hits.toLocaleString("en-US")}
      </span>
    );
  } catch (error) {
    return null;
  }
};

export default HitCounter;
