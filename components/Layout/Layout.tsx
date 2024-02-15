import Header from "../Header";
import Footer from "../Footer";
import { SkipToContentLink, SkipToContentTarget } from "../SkipToContent";
import { styled, theme } from "../../lib/styles/stitches.config";
import type { ComponentPropsWithoutRef } from "react";

const Flex = styled("div", {
  display: "flex",
  flexDirection: "column",
  minHeight: "100vh",
});

const Default = styled("main", {
  width: "100%",
  padding: "1.5em",
});

const Container = styled("div", {
  maxWidth: theme.sizes.maxLayoutWidth,
  margin: "0 auto",
  display: "block",
});

// stick header to the top of the page when scrolling
const StickyHeader = styled(Header, {
  position: "sticky",
  top: 0,
});

// footer needs to fill the remaining vertical screen space. doing it here to keep flex stuff together.
const FlexedFooter = styled(Footer, {
  flex: 1,
});

export type LayoutProps = ComponentPropsWithoutRef<typeof Flex> & {
  container?: boolean; // pass false to disable default `<main>` container styles with padding, etc.
};

const Layout = ({ container = true, children, ...rest }: LayoutProps) => {
  return (
    <>
      <SkipToContentLink />

      <Flex {...rest}>
        <StickyHeader />

        {/* passing `container={false}` to Layout allows 100% control of the content area on a per-page basis */}
        {container ? (
          <Default>
            <SkipToContentTarget />
            <Container>{children}</Container>
          </Default>
        ) : (
          <>
            <SkipToContentTarget />
            {children}
          </>
        )}

        <FlexedFooter />
      </Flex>
    </>
  );
};

export default Layout;
