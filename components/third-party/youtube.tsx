"use client";

import YouTubeEmbed from "react-lite-youtube-embed";
import type { ComponentPropsWithoutRef } from "react";

// lite-youtube-embed CSS is imported in app/global.css to save a request

const YouTube = ({ ...rest }: Omit<ComponentPropsWithoutRef<typeof YouTubeEmbed>, "title">) => {
  return <YouTubeEmbed cookie={false} containerElement="div" title="" {...rest} />;
};

export default YouTube;
