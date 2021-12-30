module.exports = {
  root: true,
  extends: ["@jakejarvis/eslint-config", "next/core-web-vitals", "plugin:prettier/recommended"],
  plugins: ["prettier"],
  rules: {
    "react/no-unescaped-entities": "off",
  },
};
