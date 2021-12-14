import * as imagemoji from "imagemoji";

const parseEmoji = (what) =>
  // we're hosting twemojis locally instead of from Twitter's CDN
  imagemoji.parse(what, (icon) => `/assets/emoji/${icon}.svg`);

// reuse this so the URL above doesn't need to be changed in multiple places
export default parseEmoji;
