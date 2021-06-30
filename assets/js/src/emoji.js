import twemoji from "twemoji";

twemoji.parse(document.body, {
  base: "/assets/emoji/",
  ext: ".svg",
  size: "svg",
  callback: function (icon, options) {
    // simpler URIs
    return options.base + icon + options.ext;
  },
});
