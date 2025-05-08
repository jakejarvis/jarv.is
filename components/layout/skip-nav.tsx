import Button from "@/components/ui/button";

export const SKIP_NAV_ID = "skip-nav";

const SkipNavButton = () => {
  return (
    <Button
      asChild
      className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-100 focus:inline-flex focus:px-4 focus:py-2"
      variant="default"
    >
      <a href={`#${SKIP_NAV_ID}`}>Skip to content</a>
    </Button>
  );
};

export default SkipNavButton;
