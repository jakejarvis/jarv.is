import { ViewTransition } from "react";

const directionalEnterClasses = {
  "nav-forward": "nav-forward",
  "nav-back": "nav-back",
  "nav-lateral": "fade-in",
  default: "none",
} as const;

const directionalExitClasses = {
  "nav-forward": "nav-forward",
  "nav-back": "nav-back",
  "nav-lateral": "fade-out",
  default: "none",
} as const;

const DirectionalTransition = ({ children }: { children: React.ReactNode }) => (
  <ViewTransition enter={directionalEnterClasses} exit={directionalExitClasses} default="none">
    {children}
  </ViewTransition>
);

const FadeTransition = ({ children }: { children: React.ReactNode }) => (
  <ViewTransition enter="fade-in" exit="fade-out" default="none">
    {children}
  </ViewTransition>
);

export { DirectionalTransition, FadeTransition };
