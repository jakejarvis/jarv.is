module.exports = {
  root: true,
  extends: [
    "@jakejarvis/eslint-config",
    "preact",
    "plugin:compat/recommended",
    "plugin:import/recommended",
    "plugin:no-unsanitized/DOM",
    "plugin:prettier/recommended",
  ],
  plugins: ["prettier"],
  parser: "@babel/eslint-parser",
  parserOptions: {
    ecmaVersion: 2018,
    sourceType: "module",
    allowImportExportEverywhere: false,
    requireConfigFile: false,
    babelOptions: {
      presets: ["@babel/preset-env"],
    },
  },
  env: {
    browser: true,
    es6: true,
  },
  rules: {
    "compat/compat": "error",
  },
  overrides: [
    {
      // Serverless functions & root config files
      files: ["api/**/*.js", "{.eslintrc,gulpfile,webpack.config}.{js,cjs}"],
      env: {
        node: true,
      },
      rules: {
        "compat/compat": "off",
      },
    },
  ],
  ignorePatterns: ["public/**", "static/assets/**"],
};
