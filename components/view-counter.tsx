import { env } from "@/lib/env";
import { connection } from "next/server";
import CountUp from "@/components/count-up";
import { incrementViews } from "@/lib/views";

const ViewCounter = async ({ slug }: { slug: string }) => {
  // ensure this component isn't triggered by prerenders and/or preloads
  await connection();

  try {
    const hits = await incrementViews(slug);

    // we have data!
    return (
      <span title={`${Intl.NumberFormat(env.NEXT_PUBLIC_SITE_LOCALE).format(hits)} ${hits === 1 ? "view" : "views"}`}>
        <CountUp start={0} end={hits} delay={0} duration={1.5} />
      </span>
    );
  } catch (error) {
    console.error("[view-counter] fatal error:", error);

    return <span title="Error getting views! :(">?</span>;
  }
};

export default ViewCounter;
