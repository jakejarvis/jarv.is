import { useRef, useEffect, useState, memo } from "react";
import { useRouter } from "next/router";
import RFB from "@novnc/novnc/core/rfb.js";
import Terminal from "../Terminal/Terminal";
import { styled } from "../../lib/styles/stitches.config";

const Display = styled(
  "div",
  {
    height: "600px",
    width: "100%",
    maxWidth: "800px",

    // these are injected by noVNC after connection, so we can't target them directly:
    "& div": {
      background: "none !important",

      "& canvas": {
        cursor: "default !important",
      },
    },
  },

  // fix fuziness in different browsers: https://stackoverflow.com/a/13492784
  // separate objects since these are duplicate properties: https://github.com/modulz/stitches/issues/758#issuecomment-913580518
  {
    imageRendering: "-webkit-optimize-contrast",
  },
  {
    imageRendering: "pixelated",
    MSInterpolationMode: "nearest-neighbor",
  }
);

const DOS = styled(Terminal, {
  height: "400px",
  width: "100%",
  maxWidth: "700px",
});

export type VNCProps = {
  server: string;
};

const VNC = ({ server }: VNCProps) => {
  const router = useRouter();

  // we definitely do NOT want this page to connect more than once!
  const [loaded, setLoaded] = useState(false);

  // DOS-style box for text
  const terminalRef = useRef<HTMLSpanElement>(null);

  // the actual connection and virtual screen (injected by noVNC when it's ready)
  const rfbRef = useRef(null);
  const screenRef = useRef<HTMLDivElement>(null);

  // makes the console reappear with the given message if there's an error loading, or if the VM has gone poof for
  // whatever reason (doesn't really matter).
  const showTerminalMessage = ({ message, anyKey = false }) => {
    try {
      screenRef.current.style.display = "none";
      terminalRef.current.parentElement.style.display = null;
      terminalRef.current.textContent = `${message}${
        anyKey ? "\n\nPress the Any key or refresh the page to continue." : ""
      }`;
    } catch (error) {} // eslint-disable-line no-empty
  };

  // hides the console and show the screen when VM connects
  const showScreen = () => {
    terminalRef.current.parentElement.style.display = "none";
    screenRef.current.style.display = null;
  };

  // ends the session forcefully
  const disconnectVM = () => {
    try {
      rfbRef.current.disconnect();
    } catch (error) {} // eslint-disable-line no-empty
  };

  // prepare for possible navigation away from this page, and disconnect if/when it happens
  useEffect(() => {
    router.events.on("routeChangeStart", disconnectVM);

    return () => {
      // unassign event listener
      router.events.off("routeChangeStart", disconnectVM);
    };
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    if (loaded) {
      // don't do any of this more than once, the backend is pretty fragile
      return;
    } else {
      // show loading indicator and continue
      showTerminalMessage({ message: "Spinning up your very own personal computer, please wait!" });
    }

    if (!window.WebSocket) {
      // browser doesn't support websockets
      showTerminalMessage({ message: "WebSockets must be enabled to begin!", anyKey: true });
      return;
    }

    // https://github.com/novnc/noVNC/blob/master/docs/API.md
    rfbRef.current = new RFB(screenRef.current, server, {
      wsProtocols: ["binary", "base64"],
    });

    // scale screen to make it kinda "responsive"
    rfbRef.current.scaleViewport = true;

    // VM connected
    rfbRef.current.addEventListener("connect", () => {
      console.log("successfully connected to VM socket!");

      // finally hide the terminal and show the VNC canvas
      showScreen();

      // this is the one and only time we're spinning up a VM (hopefully)
      setLoaded(true);
    });

    // VM disconnected (on either end)
    rfbRef.current.addEventListener("disconnect", (detail: unknown) => {
      console.warn("VM ended session remotely:", detail);

      showTerminalMessage({
        message: "Oh dear, it looks like something's gone very wrong. Sorry about that.",
        anyKey: true,
      });
    });
  }, [loaded, server]);

  return (
    <>
      <DOS ref={terminalRef} />

      {/* the VNC canvas is hidden until we've successfully connected to the socket */}
      <Display ref={screenRef} style={{ display: "none" }} />
    </>
  );
};

export default memo(VNC);
