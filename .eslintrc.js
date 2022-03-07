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
    "react/no-unescaped-entities": "off",
    "@typescript-eslint/ban-ts-comment": "off",
    "@typescript-eslint/no-explicit-any": "warn",
    "@typescript-eslint/no-var-requires": "off",
  },
  overrides: [
    {
      files: ["*.md", "*.mdx"],
      extends: ["plugin:mdx/recommended"],
      rules: {
        "react/jsx-no-undef": "off",
      },
    },
  ],
};
