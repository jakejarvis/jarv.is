"use client";

import YouTubeEmbed from "react-lite-youtube-embed";
import type { ComponentPropsWithoutRef } from "react";

import "react-lite-youtube-embed/dist/LiteYouTubeEmbed.css";

export type YouTubeProps = Omit<ComponentPropsWithoutRef<typeof YouTubeEmbed>, "title">;

const YouTube = ({ ...rest }: YouTubeProps) => {
  return <YouTubeEmbed cookie={false} containerElement="div" title="" {...rest} />;
};

export default YouTube;
