"use client";

import { useEffect } from "react";
import { ComicNeue } from "@/lib/fonts";

export const PageStyles = () => {
  useEffect(() => {
    // Create a style element
    const styleElement = document.createElement("style");
    styleElement.id = "previously-page-styles";
    styleElement.textContent = `
      body {
        cursor: url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAAZklEQVR4AWIAgn/uBT6A9uoAAwAQiIJo97/0Rgy0ANoJH8MPeEgtqwPQEACqCoQHAKECQKgAECoAhAoAoQJAqAAQxh1oPQfcW3kJpxHtL1AAHAwEwwdYiH8BIEgBTBRAAAEEEEAAG7mRt30hEhoLAAAAAElFTkSuQmCC") 2 1, auto;
      }
      a, button {
        cursor: url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgAgMAAAAOFJJnAAAACVBMVEVHcEwAAAD///8W1S+BAAAAAXRSTlMAQObYZgAAAEdJREFUeAFjoAVghTGkHIhghMAYmQEwxlIYYxlYlSiQMQEsELUKyli1ahWYwQZjMGIwGLKQGA4QA1EYEP0rGVAZrKGhSF4BAHw/HsVwshytAAAAAElFTkSuQmCC") 16 12, auto;
      }
      main {
        font-family: ${ComicNeue.style.fontFamily}, var(--font-sans);
        font-weight: 700;
        font-size: 1em;
        text-align: center;
      }
      main iframe + p em,
      main img + em {
        display: block;
        text-align: center;
        font-style: normal;
        font-size: 0.95em;
        font-weight: 700;
      }
    `;

    // Append to head
    document.head.appendChild(styleElement);

    // Cleanup function to remove styles when component unmounts
    return () => {
      const existingStyle = document.getElementById("previously-page-styles");
      if (existingStyle) {
        existingStyle.remove();
      }
    };
  }, []);

  return null;
};
