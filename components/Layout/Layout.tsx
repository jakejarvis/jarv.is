import Head from "next/head";
import Header from "../Header";
import Footer from "../Footer";
import { useTheme } from "../../hooks/use-theme";
import { styled } from "../../lib/styles/stitches.config";
import { themeColors } from "../../lib/config/themes";
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
  maxWidth: "865px",
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
        {/* dynamically set browser theme color to match the background color; default to light for SSR */}
        <meta name="theme-color" content={themeColors[activeTheme === "dark" ? "dark" : "light"]} />
      </Head>

      <Flex {...rest}>
        <StickyHeader />

        {/* passing `container={false}` to Layout allows 100% control of the content area on a per-page basis */}
        {container ? (
          <Default>
            <Container>{children}</Container>
          </Default>
        ) : (
          children
        )}

        <FlexedFooter />
      </Flex>
    </>
  );
};

export default Layout;
