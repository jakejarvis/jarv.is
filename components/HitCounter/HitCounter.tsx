import useSWRImmutable from "swr/immutable";
import { useErrorBoundary } from "react-error-boundary";
import commaNumber from "comma-number";
import Loading from "../Loading";
import fetcher from "../../lib/helpers/fetcher";
import type { PageStats } from "../../types";

export type HitCounterProps = {
  slug: string;
};

const HitCounter = ({ slug }: HitCounterProps) => {
  const { showBoundary } = useErrorBoundary();

  // use immutable SWR to avoid double (or more) counting views:
  // https://swr.vercel.app/docs/revalidation#disable-automatic-revalidations
  const { data, error } = useSWRImmutable<PageStats>(
    `/api/count/?${new URLSearchParams({
      slug,
    })}`,
    fetcher
  );

  // fail somewhat silently, see error boundary in PostMeta component
  if (error) {
    showBoundary(`${error}`);
    return null;
  }

  // show spinning loading indicator if data isn't fetched yet
  if (!data) {
    return <Loading boxes={3} width={20} />;
  }

  // we have data!
  return (
    <span title={`${commaNumber(data.hits)} ${data.hits === 1 ? "view" : "views"}`}>{commaNumber(data.hits)}</span>
  );
};

export default HitCounter;
