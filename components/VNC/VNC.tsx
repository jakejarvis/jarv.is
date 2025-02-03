"use client";

import { useRef, useEffect, useState, forwardRef, useImperativeHandle, useCallback } from "react";
import { useRouter } from "next/router";
import RFB from "@novnc/novnc/core/rfb";
import clsx from "clsx";
import Terminal from "../Terminal";
import type { Ref, ComponentPropsWithoutRef, ElementRef } from "react";

import styles from "./VNC.module.css";

export type VNCProps = ComponentPropsWithoutRef<"div"> & {
  server: string;
};

const VNC = ({ server, className, style, ...rest }: VNCProps, ref: Ref<Partial<RFB>>) => {
  const router = useRouter();

  // we definitely do NOT want this page to connect more than once!
  const [loaded, setLoaded] = useState(false);
  // keep track of current status of the connection
  const [connected, setConnected] = useState(false);
  // makes the console reappear with the given message if there's an error loading, or if the VM has gone poof for
  // whatever reason (doesn't really matter).
  const [message, setMessage] = useState({ message: "", anyKey: false });

  // the actual connection and virtual screen (injected by noVNC when it's ready)
  const rfbRef = useRef<RFB | null>(null);
  const displayRef = useRef<ElementRef<"div">>(null);

  // ends the session forcefully
  const disconnect = useCallback(() => {
    try {
      if (connected) {
        rfbRef.current?.disconnect();
      }
    } catch (error) {} // eslint-disable-line no-empty, @typescript-eslint/no-unused-vars

    rfbRef.current = null;
    setConnected(false);
  }, [connected]);

  // expose some of noVNC's functionality to the parent of this component
  useImperativeHandle(ref, () => ({
    rfb: rfbRef?.current,
    disconnect,
    focus: () => {
      rfbRef.current?.focus();
    },
    blur: () => {
      rfbRef.current?.blur();
    },
    sendCtrlAltDel: () => {
      rfbRef.current?.sendCtrlAltDel();
    },
    machineShutdown: () => {
      rfbRef.current?.machineShutdown();
    },
    machineReboot: () => {
      rfbRef.current?.machineReboot();
    },
    machineReset: () => {
      rfbRef.current?.machineReset();
    },
    clipboardPasteFrom: (text: string) => {
      rfbRef.current?.clipboardPasteFrom(text);
    },
    connected,
  }));

  // prepare for possible navigation away from this page, and disconnect if/when it happens
  useEffect(() => {
    router.events.on("routeChangeStart", disconnect);

    return () => {
      // unassign event listener
      router.events.off("routeChangeStart", disconnect);
    };
  }, [router.events, disconnect]);

  useEffect(() => {
    if (loaded) {
      // don't do any of this more than once, the backend is pretty fragile
      return;
    }

    if (!("WebSocket" in window)) {
      // browser doesn't support websockets
      setMessage({ message: "WebSockets must be enabled to begin!", anyKey: true });
      return;
    }

    // show loading indicator and continue
    setMessage({ message: "Spinning up your very own personal computer, please wait!", anyKey: false });

    // this is the one and only time we're spinning up a VM (hopefully)
    setLoaded(true);

    // https://github.com/novnc/noVNC/blob/master/docs/API.md
    rfbRef.current = new RFB(displayRef.current as Element, server, {
      wsProtocols: ["binary", "base64"],
    });

    // scale screen to make it kinda "responsive"
    rfbRef.current.scaleViewport = true;

    // VM connected
    rfbRef.current?.addEventListener("connect", () => {
      console.log("successfully connected to VM socket!");

      // finally hide the terminal and show the VNC canvas
      setConnected(true);
    });

    // VM disconnected (on either end)
    rfbRef.current?.addEventListener("disconnect", (detail: unknown) => {
      console.warn("VM ended session remotely:", detail);

      // hide the display and show the terminal
      setConnected(false);
      // apologize :(
      setMessage({ message: "Oh dear, it looks like something's gone very wrong. Sorry about that.", anyKey: true });
    });
  }, [loaded, server]);

  return (
    <>
      {!connected && (
        <Terminal
          style={{
            height: "400px",
            width: "100%",
            maxWidth: "700px",
          }}
        >
          {message.message}
          {message.anyKey && "\n\nPress the Any key (refresh the page) to continue."}
        </Terminal>
      )}

      {/* the VNC canvas is hidden until we've successfully connected to the socket */}
      <div
        ref={displayRef}
        className={clsx(styles.display, className)}
        style={{
          display: !connected ? "none" : undefined,
          ...style,
        }}
        {...rest}
      />
    </>
  );
};

export default forwardRef(VNC);
