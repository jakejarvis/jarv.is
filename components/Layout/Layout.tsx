import Head from "next/head";
import Header from "../Header";
import Footer from "../Footer";
import { SkipToContentLink, SkipToContentTarget } from "../SkipToContent";
import useTheme from "../../hooks/useTheme";
import { styled, theme, darkTheme } from "../../lib/styles/stitches.config";
import type { ComponentProps } from "react";

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

export type LayoutProps = ComponentProps<typeof Flex> & {
  container?: boolean; // pass false to disable default `<main>` container styles with padding, etc.
};

const Layout = ({ container = true, children, ...rest }: LayoutProps) => {
  const { activeTheme } = useTheme();

  return (
    <>
      <Head>
        <meta
          // dynamically set browser theme color to match the background color; default to light for SSR
          name="theme-color"
          content={(activeTheme === "dark" ? darkTheme : theme)?.colors?.backgroundOuter?.value}
        />
      </Head>

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
