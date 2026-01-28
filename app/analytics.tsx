import { Analytics as VercelAnalytics } from "@vercel/analytics/next";
import { SpeedInsights as VercelSpeedInsights } from "@vercel/speed-insights/next";

const Analytics = () => {
  return (
    <>
      <VercelAnalytics />
      <VercelSpeedInsights />
    </>
  );
};

export { Analytics };
