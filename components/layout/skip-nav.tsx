const SKIP_NAV_ID = "skip-nav";

export const SkipNavLink = () => {
  return (
    <a
      href={`#${SKIP_NAV_ID}`}
      tabIndex={0}
      className="text-primary bg-muted focus:border-ring sr-only z-[1000] underline focus:not-sr-only focus:fixed focus:top-2.5 focus:left-2.5 focus:border-2 focus:border-solid focus:p-4"
    >
      Skip to content
    </a>
  );
};

export const SkipNavTarget = () => {
  return <div id={SKIP_NAV_ID} />;
};

export default SkipNavLink;
