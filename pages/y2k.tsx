import dynamic from "next/dynamic";
import { NextSeo } from "next-seo";

// obviously, an interactive VNC display will not work even a little bit server-side
const VNC = dynamic(() => import("../components/VNC/VNC"), { ssr: false });

const Y2K = () => (
  <>
    <NextSeo
      title="Y2K Sandbox: Powered by Windows Me™ 💾"
      description="My first website on a Windows Me-powered time machine. You've been warned."
      openGraph={{
        title: "Y2K Sandbox: Powered by Windows Me™",
      }}
    />

    <VNC />

    <style jsx global>{`
      /* make the viewport a bit larger by un-sticking the nav bar */
      header {
        position: relative !important;
      }

      /* make an exception for the wrapper (and its background) to fill up the normal content area */
      main {
        padding: 0 !important;
      }
      main > div {
        max-width: 100% !important;
      }
    `}</style>
  </>
);

export default Y2K;
