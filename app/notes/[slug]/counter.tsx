import { connection } from "next/server";
import commaNumber from "comma-number";
import redis from "../../../lib/helpers/redis";

const HitCounter = async ({ slug }: { slug: string }) => {
  await connection();

  try {
    const hits = await redis.incr(slug);

    // we have data!
    return <span title={`${commaNumber(hits)} ${hits === 1 ? "view" : "views"}`}>{commaNumber(hits)}</span>;
  } catch (error) {
    console.error("[hit counter] fatal error:", error);

    throw new Error();
  }
};

export default HitCounter;
