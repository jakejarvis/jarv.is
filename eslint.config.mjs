import { FlatCompat } from "@eslint/eslintrc";
import js from "@eslint/js";
import typescriptEslint from "typescript-eslint";
import prettierRecommended from "eslint-plugin-prettier/recommended";
import customConfig from "@jakejarvis/eslint-config";
import * as mdx from "eslint-plugin-mdx";

const compat = new FlatCompat({
  baseDirectory: import.meta.dirname,
});

// eslint-disable-next-line import/no-anonymous-default-export
export default [
  { ignores: ["README.md", ".next", ".vercel", "node_modules"] },
  js.configs.recommended,
  ...typescriptEslint.configs.recommended,
  ...compat.extends("next/core-web-vitals"),
  prettierRecommended,
  ...customConfig,
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
    ...mdx.flat,
    processor: mdx.createRemarkProcessor({
      lintCodeBlocks: false,
    }),
    rules: {
      "mdx/remark": "warn",
      "mdx/code-blocks": "off",
      "react/jsx-no-undef": "off",
      "react/jsx-boolean-value": "off",
      "react/no-unescaped-entities": "off",
      // TODO: skip these correctly
      "max-len": "off",
      semi: "off",
    },
  },
];
