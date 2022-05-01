import { useEffect, useState } from "react";
import { ErrorBoundary } from "react-error-boundary";
import dynamic from "next/dynamic";
import { NextSeo } from "next-seo";
import Layout from "../components/Layout";
import Terminal from "../components/Terminal";
import { styled } from "../lib/styles/stitches.config";
import type { ReactElement, ComponentProps } from "react";

// obviously, an interactive VNC display will not work even a little bit server-side
const VNC = dynamic(() => import("../components/VNC"), { ssr: false });

// https://github.com/jakejarvis/y2k
const SOCKET_PROXY = "wss://y2k.jrvs.io";

const Wallpaper = styled("main", {
  display: "flex",
  width: "100%",
  minHeight: "500px",
  padding: "1.5em 0",
  justifyContent: "center",
  alignItems: "center",
  backgroundRepeat: "repeat",
  backgroundPosition: "center",
});

const DOS = styled(Terminal, {
  height: "400px",
  width: "100%",
  maxWidth: "700px",
});

const Wrapper = ({ style, ...rest }: ComponentProps<typeof Wrapper>) => {
  const [wallpaperUrl, setWallpaperUrl] = useState("");

  // set a random retro Windows ME desktop tile for the entire content area
  useEffect(() => {
    setWallpaperUrl(`/static/images/y2k/tiles/tile_${Math.floor(20 * Math.random())}.png`);
  }, []);

  return <Wallpaper style={{ backgroundImage: wallpaperUrl ? `url(${wallpaperUrl})` : "", ...style }} {...rest} />;
};

const Y2K = () => {
  // print a fancy console message (in browser only) just for funsies
  useEffect(() => {
    console.log(
      `
%c🤓 %cHey there, fellow nerd!%c Looking for the magic behind this page?

%cCheck out this post: https://jarv.is/notes/y2k-sandbox/

...or the source code here: https://github.com/jakejarvis/y2k
`,
      "font-size: 20px",
      "color: black; background: yellow; font-size: 20px",
      "font-size: 20px",
      "font-size: 15px"
    );
  }, []);

  return (
    <>
      <NextSeo
        title="Y2K Sandbox: Powered by Windows Me™ 💾"
        description="My first website on a Windows Me-powered time machine. You've been warned."
        openGraph={{
          title: "Y2K Sandbox: Powered by Windows Me™",
        }}
      />

      <ErrorBoundary fallback={<DOS>Oh no, it looks like something's gone VERY wrong. Sorry about that!</DOS>}>
        <VNC server={SOCKET_PROXY} />
      </ErrorBoundary>
    </>
  );
};

// disable layout's default styles so the wallpaper component can go edge-to-edge:
Y2K.getLayout = (page: ReactElement) => {
  return (
    <Layout container={false}>
      <Wrapper>{page}</Wrapper>
    </Layout>
  );
};

export default Y2K;
