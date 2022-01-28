import { useRef, useEffect, useState, memo } from "react";
import { useRouter } from "next/router";
import classNames from "classnames";
import RFB from "@novnc/novnc/core/rfb.js";

import styles from "./VNC.module.css";

type Props = {
  className?: string;
};

const WEBSOCKETS_SERVER = "wss://socket.y2k.app";

const VNC = ({ className }: Props) => {
  const router = useRouter();

  // we definitely do NOT want this page to connect more than once!
  const [loaded, setLoaded] = useState(false);

  // DOS-style box for text
  const consoleRef = useRef<HTMLDivElement>(null);
  const statusRef = useRef<HTMLSpanElement>(null);

  // the actual connection and virtual screen (injected by noVNC when it's ready)
  const rfbRef = useRef(null);
  const screenRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // end the session when the current page changes
    const disconnectVM = () => {
      try {
        rfbRef.current.disconnect();
      } catch (e) {} // eslint-disable-line no-empty
    };

    // prepare for possible navigation away from this page
    router.events.on("routeChangeStart", disconnectVM);

    return () => {
      // unassign event listener
      router.events.off("routeChangeStart", disconnectVM);
    };
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    if (loaded) {
      return;
    }

    if (!window.WebSocket) {
      // browser doesn't support websockets
      statusRef.current.textContent =
        "WebSockets must be enabled to play in the Y2K Sandbox!!!\n\nPress the Any key to continue.";

      return;
    }

    // https://github.com/novnc/noVNC/blob/master/docs/API.md
    rfbRef.current = new RFB(screenRef.current, WEBSOCKETS_SERVER, {
      wsProtocols: ["binary", "base64"],
    });

    // this is the one and only time we're spinning up a VM (hopefully)
    setLoaded(true);

    // VM connected
    rfbRef.current.addEventListener("connect", () => {
      console.log("successfully connected to VM socket!");

      // hide the console when VM connects
      consoleRef.current.style.display = "none";
    });

    // VM disconnected
    rfbRef.current.addEventListener("disconnect", (detail) => {
      console.warn("VM ended session remotely:", detail);

      // make the console reappear now that the VM has gone poof for whatever reason (doesn't really matter)
      try {
        consoleRef.current.style.display = "block";
        statusRef.current.textContent =
          "Oh dear, it looks like something's gone very wrong. Sorry about that.\n\nPress the Any key or refresh the page to continue.";
      } catch (e) {} // eslint-disable-line no-empty
    });

    console.log(
      "🤓 Hey, fellow nerd! Want to see how I made this? Check out this post: https://jarv.is/notes/y2k-sandbox/"
    );
  }, [loaded]);

  return (
    <div
      className={classNames(styles.container, className)}
      style={{
        // set a random retro wallpaper tile for the content area
        background: `url('/static/images/y2k/tiles/tile_${Math.floor(20 * Math.random())}.png')`,
      }}
    >
      <div ref={consoleRef} className={classNames("monospace", styles.cmd)}>
        <span ref={statusRef}>Spinning up your very own personal computer, please wait!</span>{" "}
        <span className={styles.blink}>_</span>
      </div>

      <div ref={screenRef} className={styles.display} />
    </div>
  );
};

export default memo(VNC);
