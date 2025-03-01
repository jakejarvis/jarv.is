"use client";

import { useEffect, useId } from "react";
import { animated, Globals, useSpring, useReducedMotion } from "@react-spring/web";
import useFirstMountState from "../../hooks/useFirstMountState";
import useTheme from "../../hooks/useTheme";
import useHasMounted from "../../hooks/useHasMounted";

import styles from "./ThemeToggle.module.css";

export type ThemeToggleProps = {
  className?: string;
};

const ThemeToggle = ({ className }: ThemeToggleProps) => {
  const hasMounted = useHasMounted();
  const { theme, setTheme } = useTheme();
  const isFirstMount = useFirstMountState();
  const prefersReducedMotion = useReducedMotion() ?? false;
  const maskId = useId(); // SSR-safe ID to cross-reference areas of the SVG

  // default to light since `theme` might be undefined
  const safeTheme = theme === "dark" ? theme : "light";

  // accessibility: disable animation if user prefers reduced motion
  useEffect(() => {
    Globals.assign({
      skipAnimation: isFirstMount || prefersReducedMotion,
    });
  }, [isFirstMount, prefersReducedMotion]);

  // modified from https://jfelix.info/blog/using-react-spring-to-animate-svg-icons-dark-mode-toggle
  const springProperties = {
    light: {
      svg: {
        transform: "rotate(90deg)",
      },
      circle: {
        r: 5,
      },
      mask: {
        cx: "100%",
        cy: "0%",
      },
      lines: {
        opacity: 1,
      },
    },
    dark: {
      svg: {
        transform: "rotate(40deg)",
      },
      circle: {
        r: 9,
      },
      mask: {
        cx: "50%",
        cy: "23%",
      },
      lines: {
        opacity: 0,
      },
    },
    springConfig: { mass: 4, tension: 250, friction: 35 },
  };

  const { svg, circle, mask, lines } = springProperties[safeTheme];

  const svgContainerProps = useSpring({
    ...svg,
    config: springProperties.springConfig,
  });
  const centerCircleProps = useSpring({
    ...circle,
    config: springProperties.springConfig,
  });
  const maskedCircleProps = useSpring({
    ...mask,
    config: springProperties.springConfig,
  });
  const linesProps = useSpring({
    ...lines,
    config: springProperties.springConfig,
  });

  // render a blank div of the same size to avoid layout shifting until we're fully mounted and self-aware
  if (!hasMounted) {
    return (
      <div className={styles.toggle}>
        <div className={className} />
      </div>
    );
  }

  return (
    <button
      onClick={() => setTheme(safeTheme === "light" ? "dark" : "light")}
      className={styles.toggle}
      title={safeTheme === "light" ? "Toggle Dark Mode" : "Toggle Light Mode"}
      aria-label={safeTheme === "light" ? "Toggle Dark Mode" : "Toggle Light Mode"}
    >
      {/* @ts-ignore */}
      <animated.svg
        xmlns="http://www.w3.org/2000/svg"
        width="1em"
        height="1em"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        style={{
          ...svgContainerProps,
        }}
        className={className}
        aria-hidden
      >
        <mask id={`mask-${maskId}`}>
          <rect x="0" y="0" width="100%" height="100%" fill="white" />
          <animated.circle
            r="9"
            fill="black"
            // @ts-ignore
            style={maskedCircleProps}
          />
        </mask>

        {/* circle shared by both the sun and crescent moon */}
        <animated.circle
          cx="12"
          cy="12"
          fill="currentColor"
          mask={`url(#mask-${maskId})`}
          // @ts-ignore
          style={centerCircleProps}
        />

        {/* sunrays pulled from https://github.com/feathericons/feather/blob/734f3f51144e383cfdc6d0916831be8d1ad2a749/icons/sun.svg?short_path=fea872c#L13 */}
        {/* @ts-ignore */}
        <animated.g stroke="currentColor" style={linesProps}>
          <line x1="12" y1="1" x2="12" y2="3" />
          <line x1="12" y1="21" x2="12" y2="23" />
          <line x1="4.22" y1="4.22" x2="5.64" y2="5.64" />
          <line x1="18.36" y1="18.36" x2="19.78" y2="19.78" />
          <line x1="1" y1="12" x2="3" y2="12" />
          <line x1="21" y1="12" x2="23" y2="12" />
          <line x1="4.22" y1="19.78" x2="5.64" y2="18.36" />
          <line x1="18.36" y1="5.64" x2="19.78" y2="4.22" />
        </animated.g>
      </animated.svg>
    </button>
  );
};

export default ThemeToggle;
