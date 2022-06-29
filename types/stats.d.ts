export type PageStats = {
  hits: number;
};

export type DetailedPageStats = PageStats & {
  slug: string;
  title?: string;
  url?: string;
  date?: string;
};

export type SiteStats = {
  total: PageStats;
  pages: DetailedPageStats[];
};
