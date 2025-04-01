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
    plugins: ["react-compiler", "css-modules"],
    extends: ["eslint:recommended", "next/core-web-vitals", "next/typescript", "plugin:css-modules/recommended"],
  }),
  ...eslintCustomConfig,
  eslintPluginPrettierRecommended,
  {
    rules: {
      camelcase: [
        "error",
        {
          allow: ["^unstable_"],
        },
      ],
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
      "@typescript-eslint/ban-ts-comment": "off",
      "@typescript-eslint/no-explicit-any": "warn",
      "react-compiler/react-compiler": "error",
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
