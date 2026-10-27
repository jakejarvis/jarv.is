import { useLocation, useMatches } from "@tanstack/react-router";
import { Analytics } from "@vercel/analytics/react";

/** Route pattern of the deepest match, in Vercel's format: `/notes/$slug/` → `/notes/[slug]`. */
const toRoutePattern = (fullPath: string) =>
  fullPath.replace(/\$(\w+)/g, "[$1]").replace(/(.)\/$/, "$1");

/** Vercel Web Analytics, grouping pageviews by route pattern like the Next.js integration did. */
const VercelAnalytics = () => {
  const route = useMatches({
    select: (matches) => {
      const fullPath = matches.at(-1)?.fullPath;
      return fullPath ? toRoutePattern(fullPath) : null;
    },
  });
  const path = useLocation({ select: (location) => location.pathname });

  return <Analytics route={route} path={path} />;
};

export { VercelAnalytics };
