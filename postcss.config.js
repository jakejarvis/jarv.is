module.exports = {
  options: {
    map: false,
  },
  plugins: [
    require("postcss-import")(),
    require("autoprefixer")(),
    require("postcss-svgo")({
      encode: true,
    }),
    require("postcss-focus")(),
    require("postcss-color-rgba-fallback")({
      properties: [
        "background-image"
      ],
    }),
    require("postcss-combine-duplicated-selectors")(),
    require("postcss-normalize-charset")(),
    require("postcss-clean")({
      compatibility: "*",
      level: 1,
      processImport: false,
      format: {
        breaks: {
          afterAtRule: true,
          afterBlockBegins: true,
          afterBlockEnds: true,
          afterComment: true,
          afterRuleEnds: true,
          beforeBlockEnds: true,
        },
        spaces: {
          beforeBlockBegins: true,
        },
        semicolonAfterLastProperty: true,
      },
    }),
    require("postcss-reporter")({
      clearReportedMessages: true,
    }),
  ],
};
