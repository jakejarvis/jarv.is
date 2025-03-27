import { connection } from "next/server";
import commaNumber from "comma-number";
import CountUp from "../../../components/CountUp";
import redis from "../../../lib/helpers/redis";

const HitCounter = async ({ slug }: { slug: string }) => {
  await connection();

  try {
    const hits = await redis.incr(slug);

    // we have data!
    return (
      <span title={`${commaNumber(hits)} ${hits === 1 ? "view" : "views"}`}>
        <CountUp start={0} end={hits} delay={0} duration={2.5} />
      </span>
    );
  } catch (error) {
    console.error("[hit counter] fatal error:", error);

    throw new Error();
  }
};

export default HitCounter;
