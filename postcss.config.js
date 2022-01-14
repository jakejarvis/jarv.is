// https://nextjs.org/docs/advanced-features/customizing-postcss-config#customizing-plugins
module.exports = {
  plugins: [
    "postcss-flexbugs-fixes",
    [
      "postcss-font-display",
      {
        display: "fallback",
        replace: true,
      },
    ],
    [
      "postcss-preset-env",
      {
        autoprefixer: {
          flexbox: "no-2009",
        },
        stage: 3,
        features: {
          "custom-properties": false,
        },
      },
    ],
  ],
};
