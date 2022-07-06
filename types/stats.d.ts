import type { NoteFrontMatter } from "./note";

export type PageStats = {
  hits: number;
};

export type DetailedPageStats = PageStats &
  Pick<NoteFrontMatter, "slug" | "title" | "date"> & {
    url: string;
  };

export type SiteStats = {
  total: PageStats;
  pages: DetailedPageStats[];
};
