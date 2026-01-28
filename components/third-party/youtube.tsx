"use client";

import YouTubeEmbed from "react-lite-youtube-embed";

// lite-youtube-embed CSS is imported in app/global.css to save a request

const YouTube = ({ ...rest }: Omit<React.ComponentProps<typeof YouTubeEmbed>, "title">) => {
  return <YouTubeEmbed cookie={false} containerElement="div" title="" {...rest} />;
};

export { YouTube };
