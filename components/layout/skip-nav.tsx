import Button from "@/components/ui/button";

const SKIP_NAV_ID = "skip-nav";

export const SkipNavLink = () => {
  return (
    <Button
      asChild
      className="sr-only transition-none focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-100 focus:inline-flex focus:px-4 focus:py-2"
      variant="default"
    >
      <a href={`#${SKIP_NAV_ID}`}>Skip to content</a>
    </Button>
  );
};

export const SkipNavTarget = () => {
  return <div id={SKIP_NAV_ID} />;
};

export default SkipNavLink;
