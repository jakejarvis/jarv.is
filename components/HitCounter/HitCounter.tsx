import useSWRImmutable from "swr/immutable";
import commaNumber from "comma-number";
import Loading from "../Loading";
import fetcher from "../../lib/helpers/fetcher";
import type { PageStats } from "../../types";

export type HitCounterProps = {
  slug: string;
  className?: string;
};

const HitCounter = ({ slug, className }: HitCounterProps) => {
  // use immutable SWR to avoid double (or more) counting views:
  // https://swr.vercel.app/docs/revalidation#disable-automatic-revalidations
  const { data, error } = useSWRImmutable<PageStats>(
    `/api/hits/?${new URLSearchParams({
      slug,
    })}`,
    fetcher
  );

  // fail secretly
  if (error) {
    return null;
  }

  // show spinning loading indicator if data isn't fetched yet
  if (!data) {
    return <Loading boxes={3} width={20} />;
  }

  // we have data!
  return (
    <span title={`${commaNumber(data.hits)} ${data.hits === 1 ? "view" : "views"}`} className={className}>
      {commaNumber(data.hits)}
    </span>
  );
};

export default HitCounter;
