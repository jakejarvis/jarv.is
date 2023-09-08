import { useEffect, useRef } from "react";
import { ErrorBoundary } from "react-error-boundary";
import dynamic from "next/dynamic";
import Head from "next/head";
import { NextSeo } from "next-seo";
import Layout from "../components/Layout";
import Terminal from "../components/Terminal";
import { styled } from "../lib/styles/stitches.config";
import type { ReactElement, ComponentPropsWithoutRef, ElementRef } from "react";

// obviously, an interactive VNC display will not work even a little bit server-side
const VNC = dynamic(() => import("../components/VNC"), { ssr: false });

// https://github.com/jakejarvis/y2k
const SOCKET_PROXY = "wss://y2k.pipe.fail";

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

const RandomWallpaper = ({ ...rest }: ComponentPropsWithoutRef<typeof Wallpaper>) => {
  const wallpaperRef = useRef<ElementRef<typeof Wallpaper>>(null);

  // set a random retro Windows ME desktop tile for the entire content area
  useEffect(() => {
    const wallpaperUrl = `/static/images/y2k/tiles/tile_${Math.floor(20 * Math.random())}.png`;
    if (wallpaperRef.current) {
      wallpaperRef.current.style.backgroundImage = `url(${wallpaperUrl})`;
    }
  }, []);

  return <Wallpaper ref={wallpaperRef} {...rest} />;
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
      <Head>
        {/* TODO: favicon doesn't change back to normal when navigating away from page */}
        <link
          href="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAAXNSR0IArs4c6QAAA2tJREFUOE+Nk21sU2Ucxc/T3Xu73vXedl3fNtuCNm4oW9jY1M2hRAIBZCSGxMWFOWIMBDRGzNzQ+PJhvmCcgkSTLZioifIiBiQBNWo6Gdlw4AwMGFAyR8fWbuu6vt12W297+5hbM42RDz4f/yfn5OSX8xD8z+d+eMhqLi97mhJtFaGpi6NMaNNMZuI7cid/SfUgH7gvU6/h2HpVL8q3PcpruVXB6fDZ+cPL1uY8z5x0grUd/0+AfvuRtxLh2l3VrmyRU8NjPGKCssKHW2YLYjNKFCO+HkSVbnxV+zN2DLT+K6B45cD3ky524wubgc1uCd29bngVBybKIohpCpHvBtIzgHI+CPinKtQifweUGD2nAtWZhkP7gljPEzz7TQP6x1OwT09KU7ZiIdJgxbqVAHigbxBIfB26jIOWFbmAUtHz4E1m7Hzv5SAegRmV7Y3w6uVgKuN9Ap/V/6rqf2ziTrnb6q2vVBEMKcCBjiDQYSNEBRa54e8/+sW3lesfMuOx3e/ippbFrPBLJw6uaf8H8t73jW1b2rbtLYU+D3jn85iMnhsNuQa7nmuiu5sm8eqhLvTGlsEuyogzUlzVqFUish00NMnSrFBo0FfyICaAhoHEyetdpKPjqSqRuTDgDb/NHfM3QTacg4vWQJwhYEQWjD2MyF0J3DIJiE1pgWAS0NK/il3z7SftLzVdHA9ZK68Y9iMQPZG7lxi3wNv3w7H0pbFLesGgT0ixBJ+vm9awnJsxFeuUFM3maYkmyoydJc83r6JX8QYGsBqOK+8hUlEO2NZAo+DL0EemlkUG6hILXfJh6YHlnHrL+tP5o3OnD5CWxidj4/d0i2d6esBdGMHSxqUImFxYwtQhpBvxTBUc6dP7S/OWJGtfp0YbiFmHVBHgG/UgE0+4VIh0+ZsU/t+2e+Qzt2sEZ6vBUs1j1smBS9+dXogvsGbGBouWg5LDCoRlH4YLjm/Apy//SHZue234qLXl/mhnGbGWl9uUq/EPRefjq2ddGx20wgy9yGCeGlGSdCJPljCh6f8pQkf3qebcEnds3dl6Lrv1g+uG283FQ5+ckCVJjPKWYfHanC5pWKto3C6WKzAm045sVwL+vkXjIhviqKvTLcw275m3M3uS94bCmHZLwqDltM78YicnCPGs/HFuK4Hfa+bu9HP/BEU2W1FE/2aJAAAAAElFTkSuQmCC"
          rel="icon"
          type="image/png"
        />
      </Head>

      <NextSeo
        title="Y2K Sandbox: Powered by Windows Me™ 💾"
        description="My first website on a Windows Me-powered time machine. You've been warned."
        openGraph={{
          title: "Y2K Sandbox: Powered by Windows Me™",
        }}
      />

      <noscript>
        <Terminal
          css={{
            height: "250px",
            width: "600px",
          }}
        >
          JavaScript must be enabled to experience Y2K!
        </Terminal>
      </noscript>

      <ErrorBoundary
        fallback={
          <Terminal
            css={{
              height: "400px",
              width: "100%",
              maxWidth: "700px",
            }}
          >
            Oh no, it looks like something's gone VERY wrong. Sorry about that!
          </Terminal>
        }
      >
        <VNC server={SOCKET_PROXY} />
      </ErrorBoundary>
    </>
  );
};

// disable layout's default styles so the wallpaper component can go edge-to-edge:
Y2K.getLayout = (page: ReactElement) => {
  return (
    <Layout
      container={false}
      css={{
        // classic windows 9x cursor easter egg
        cursor: `url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAAZklEQVR4AWIAgn/uBT6A9uoAAwAQiIJo97/0Rgy0ANoJH8MPeEgtqwPQEACqCoQHAKECQKgAECoAhAoAoQJAqAAQxh1oPQfcW3kJpxHtL1AAHAwEwwdYiH8BIEgBTBRAAAEEEEAAG7mRt30hEhoLAAAAAElFTkSuQmCC") 2 1, auto`,

        "a:hover, button": {
          // windows 9x hand cursor
          cursor: `url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgAgMAAAAOFJJnAAAACVBMVEVHcEwAAAD///8W1S+BAAAAAXRSTlMAQObYZgAAAEdJREFUeAFjoAVghTGkHIhghMAYmQEwxlIYYxlYlSiQMQEsELUKyli1ahWYwQZjMGIwGLKQGA4QA1EYEP0rGVAZrKGhSF4BAHw/HsVwshytAAAAAElFTkSuQmCC") 16 12, auto`,
        },
      }}
    >
      <RandomWallpaper>{page}</RandomWallpaper>
    </Layout>
  );
};

export default Y2K;
