"use client";

import YouTubeEmbed from "react-lite-youtube-embed";

// lite-youtube-embed CSS is imported in app/global.css to save a request

const YouTube = ({ title = "YouTube video", ...rest }: React.ComponentProps<typeof YouTubeEmbed>) => {
  return <YouTubeEmbed cookie={false} containerElement="div" title={title} {...rest} />;
};

export { YouTube };
