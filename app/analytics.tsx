import { Analytics as VercelAnalytics } from "@vercel/analytics/react";
import { SpeedInsights as VercelSpeedInsights } from "@vercel/speed-insights/react";

const Analytics = () => (
  <>
    <VercelAnalytics />
    <VercelSpeedInsights />
  </>
);

export { Analytics };
