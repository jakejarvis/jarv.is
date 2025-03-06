/* eslint-disable import/no-anonymous-default-export */

import { FlatCompat } from "@eslint/eslintrc";
import js from "@eslint/js";
import * as eslintPluginMdx from "eslint-plugin-mdx";
import eslintPluginPrettierRecommended from "eslint-plugin-prettier/recommended";
import eslintCustomConfig from "@jakejarvis/eslint-config";

/** @type {import("@eslint/eslintrc").FlatCompat} */
const compat = new FlatCompat({
  baseDirectory: import.meta.dirname,
  recommendedConfig: js.configs.recommended,
});

/** @type {import("eslint").Linter.Config[]} */
export default [
  { ignores: ["README.md", ".next", ".vercel", "node_modules"] },
  ...compat.config({
    extends: ["eslint:recommended", "next/core-web-vitals", "next/typescript"],
  }),
  ...eslintCustomConfig,
  eslintPluginPrettierRecommended,
  {
    rules: {
      "prettier/prettier": [
        "error",
        {},
        {
          usePrettierrc: true,
        },
      ],
    },
  },
  {
    files: ["**/*.ts", "**/*.tsx", "**/*.js", "**/*.jsx"],
    rules: {
      camelcase: "off",
      "@typescript-eslint/ban-ts-comment": "off",
      "@typescript-eslint/no-explicit-any": "warn",
      "react/no-unescaped-entities": "off",
      "react/jsx-boolean-value": "error",
      "react/jsx-wrap-multilines": [
        "error",
        {
          arrow: "parens-new-line",
          assignment: "parens-new-line",
          condition: "parens-new-line",
          declaration: "parens-new-line",
          logical: "parens-new-line",
          prop: "ignore",
          return: "parens-new-line",
        },
      ],
    },
  },
  {
    ...eslintPluginMdx.flat,
    processor: eslintPluginMdx.createRemarkProcessor({
      lintCodeBlocks: false,
    }),
    rules: {
      "mdx/remark": "warn",
      "mdx/code-blocks": "off",
      "react/jsx-no-undef": "off", // components are injected automatically from mdx-components.ts
    },
  },
];
