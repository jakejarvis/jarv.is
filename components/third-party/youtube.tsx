"use client";

import YouTubeEmbed from "react-lite-youtube-embed";
import type { ComponentPropsWithoutRef } from "react";

const YouTube = ({ ...rest }: Omit<ComponentPropsWithoutRef<typeof YouTubeEmbed>, "title">) => {
  return (
    <div
      // lite-youtube-embed CSS is imported in app/global.css to save a request
      className="youtube-embed"
    >
      <YouTubeEmbed cookie={false} containerElement="div" title="" {...rest} />
    </div>
  );
};

export default YouTube;
