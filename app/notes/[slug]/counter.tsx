import { connection } from "next/server";
import * as Sentry from "@sentry/nextjs";
import commaNumber from "comma-number";
import CountUp from "../../../components/CountUp";
import redis from "../../../lib/helpers/redis";

const HitCounter = async ({ slug }: { slug: string }) => {
  await connection();

  try {
    // if this is a new slug, redis will automatically create a new key and set its value to 0 (and then 1, obviously)
    // https://upstash.com/docs/redis/sdks/ts/commands/string/incr
    // TODO: maybe don't allow this? or maybe it's fine? kinda unclear how secure this is:
    // https://nextjs.org/blog/security-nextjs-server-components-actions
    // https://nextjs.org/docs/app/building-your-application/rendering/server-components
    const hits = await redis.incr(slug);

    // we have data!
    return (
      <span title={`${commaNumber(hits)} ${hits === 1 ? "view" : "views"}`}>
        <CountUp start={0} end={hits} delay={0} duration={2.5} />
      </span>
    );
  } catch (error) {
    Sentry.captureException(error);

    return <span title="Error getting views! :(">?</span>;
  }
};

export default HitCounter;
