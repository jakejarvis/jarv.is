"use client";

import YouTubeEmbed from "react-lite-youtube-embed";
import type { ComponentPropsWithoutRef } from "react";

import "react-lite-youtube-embed/dist/LiteYouTubeEmbed.css";

const YouTube = ({ ...rest }: Omit<ComponentPropsWithoutRef<typeof YouTubeEmbed>, "title">) => {
  return <YouTubeEmbed cookie={false} containerElement="div" title="" {...rest} />;
};

export default YouTube;
