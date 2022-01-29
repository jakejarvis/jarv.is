import { useRef, useEffect, useState, memo } from "react";
import { useRouter } from "next/router";
import classNames from "classnames";
import RFB from "@novnc/novnc/core/rfb.js";

import styles from "./VNC.module.css";

type Props = {
  server: string;
};

const VNC = ({ server }: Props) => {
  const router = useRouter();

  // we definitely do NOT want this page to connect more than once!
  const [loaded, setLoaded] = useState(false);

  // DOS-style box for text
  const terminalRef = useRef<HTMLDivElement>(null);
  const terminalMessageRef = useRef<HTMLSpanElement>(null);

  // the actual connection and virtual screen (injected by noVNC when it's ready)
  const rfbRef = useRef(null);
  const screenRef = useRef<HTMLDivElement>(null);

  // makes the console reappear with the given message if there's an error loading, or if the VM has gone poof for
  // whatever reason (doesn't really matter).
  const showTerminalMessage = (message = "") => {
    try {
      screenRef.current.style.display = "none";
      terminalRef.current.style.display = null;
      terminalMessageRef.current.textContent = `${message}\n\nPress the Any key or refresh the page to continue.`;
    } catch (e) {} // eslint-disable-line no-empty
  };

  // hide the console when VM connects and show the screen
  const showScreen = () => {
    terminalRef.current.style.display = "none";
    screenRef.current.style.display = null;
  };

  // end the session forcefully
  const disconnectVM = () => {
    try {
      rfbRef.current.disconnect();
    } catch (e) {} // eslint-disable-line no-empty
  };

  // prepare for possible navigation away from this page, and disconnect when it happens
  useEffect(() => {
    router.events.on("routeChangeStart", disconnectVM);

    return () => {
      // unassign event listener
      router.events.off("routeChangeStart", disconnectVM);
    };
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    if (loaded) {
      // don't do any of this more than once and overwhelm the fragile backend
      return;
    }

    if (!window.WebSocket) {
      // browser doesn't support websockets
      showTerminalMessage("WebSockets must be enabled to begin!");
      return;
    }

    // https://github.com/novnc/noVNC/blob/master/docs/API.md
    rfbRef.current = new RFB(screenRef.current, server, {
      wsProtocols: ["binary", "base64"],
    });

    // scale screen to make it kinda "responsive"
    rfbRef.current.scaleViewport = true;

    // this is the one and only time we're spinning up a VM (hopefully)
    setLoaded(true);

    // VM connected
    rfbRef.current.addEventListener("connect", () => {
      console.log("successfully connected to VM socket!");

      showScreen();
    });

    // VM disconnected
    rfbRef.current.addEventListener("disconnect", (detail: unknown) => {
      console.warn("VM ended session remotely:", detail);

      showTerminalMessage("Oh dear, it looks like something's gone very wrong. Sorry about that.");
    });
  }, [loaded, server]);

  return (
    <>
      <div ref={terminalRef} className={classNames(styles.cmd, "monospace")}>
        <span ref={terminalMessageRef}>Spinning up your very own personal computer, please wait!</span>{" "}
        <span className={styles.blink}>_</span>
      </div>

      {/* the VNC canvas is hidden until we've successfully connected to the socket */}
      <div ref={screenRef} className={styles.display} style={{ display: "none" }} />
    </>
  );
};

export default memo(VNC);
