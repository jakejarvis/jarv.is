// a silly file, but this ensures that /api/count returns exactly what <HitCounter /> expects.

import type { hits as Hits } from "@prisma/client";

export type PageStats = Pick<Hits, "hits">;

export type SiteStats = {
  total: PageStats;
  pages: Hits[];
};
