import { buildFeed } from "../../lib/helpers/build-feed";

export const dynamic = "force-static";

export const GET = async () => {
  return new Response((await buildFeed()).atom1(), {
    headers: {
      "content-type": "application/atom+xml; charset=utf-8",
    },
  });
};
