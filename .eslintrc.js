/**
 * @type {import("eslint").Linter.Config}
 */
module.exports = {
  root: true,
  parser: "@typescript-eslint/parser",
  extends: [
    "@jakejarvis/eslint-config",
    "next/core-web-vitals",
    "plugin:@typescript-eslint/recommended",
    "plugin:prettier/recommended",
  ],
  plugins: ["@typescript-eslint", "prettier"],
  rules: {
    camelcase: "off",
    "@typescript-eslint/ban-ts-comment": "off",
    "@typescript-eslint/no-explicit-any": "warn",
    "react/no-unescaped-entities": "off",
    "react/jsx-boolean-value": "error",
    "react/jsx-wrap-multilines": [
      "error",
      {
        // https://github.com/jsx-eslint/eslint-plugin-react/blob/HEAD/docs/rules/jsx-wrap-multilines.md#rule-details
        arrow: "parens-new-line",
        assignment: "parens-new-line",
        condition: "parens-new-line",
        declaration: "parens-new-line",
        logical: "parens-new-line",
        prop: "ignore",
        return: "parens-new-line",
      },
    ],
    "prettier/prettier": ["error", {}, { usePrettierrc: true }],
  },
  overrides: [
    {
      files: ["*.md", "*.mdx"],
      extends: ["plugin:mdx/recommended"],
      rules: {
        "import/no-unresolved": "off",
        "react/jsx-no-undef": "off",
        "react/jsx-boolean-value": "off", // TODO: causes some inconsistent parser errors in mdx
        "react/no-unknown-property": "off",
      },
    },
  ],
  ignorePatterns: ["README.md"],
};
