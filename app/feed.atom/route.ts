import { buildFeed } from "../../lib/helpers/build-feed";

export const dynamic = "force-static";

export const GET = async () => {
  return new Response(await buildFeed({ type: "atom" }), {
    headers: {
      "content-type": "application/atom+xml; charset=utf-8",
    },
  });
};
