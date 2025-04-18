import { env } from "../../../lib/env";
import { connection } from "next/server";
import CountUp from "../../../components/CountUp";
import redis from "../../../lib/redis";

const HitCounter = async ({ slug }: { slug: string }) => {
  // ensure this component isn't triggered by prerenders and/or preloads
  await connection();

  try {
    // if this is a new slug, redis will automatically create a new key and set its value to 0 (and then 1, obviously)
    // https://upstash.com/docs/redis/sdks/ts/commands/string/incr
    // TODO: maybe don't allow this? or maybe it's fine? kinda unclear how secure this is:
    // https://nextjs.org/blog/security-nextjs-server-components-actions
    // https://nextjs.org/docs/app/building-your-application/rendering/server-components
    const hits = await redis.incr(`hits:${slug}`);

    // we have data!
    return (
      <span title={`${Intl.NumberFormat(env.NEXT_PUBLIC_SITE_LOCALE).format(hits)} ${hits === 1 ? "view" : "views"}`}>
        <CountUp start={0} end={hits} delay={0} duration={1.5} />
      </span>
    );
  } catch (error) {
    console.error("[/notes/[slug]/counter] fatal error:", error);

    return <span title="Error getting views! :(">?</span>;
  }
};

export default HitCounter;
