import { defineConfig, globalIgnores } from "eslint/config";
import { FlatCompat } from "@eslint/eslintrc";
import js from "@eslint/js";
import nextVitals from "eslint-config-next/core-web-vitals";
import nextTs from "eslint-config-next/typescript";
import * as eslintPluginMdx from "eslint-plugin-mdx";
import eslintPluginPrettierRecommended from "eslint-plugin-prettier/recommended";
import eslintCustomConfig from "@jakejarvis/eslint-config";

/** @type {import("@eslint/eslintrc").FlatCompat} */
const compat = new FlatCompat({
  baseDirectory: import.meta.dirname,
  recommendedConfig: js.configs.recommended,
});

const eslintConfig = defineConfig([
  // Next.js core-web-vitals and TypeScript configs
  ...nextVitals,
  ...nextTs,
  // Other plugins via compat
  ...compat.config({
    plugins: ["react-compiler", "css-modules"],
    extends: ["plugin:css-modules/recommended", "plugin:drizzle/recommended"],
  }),
  // Custom configs
  ...eslintCustomConfig,
  eslintPluginPrettierRecommended,
  // Custom rules
  {
    rules: {
      camelcase: [
        "error",
        {
          allow: ["^experimental_", "^unstable_"],
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
  // MDX support
  {
    ...eslintPluginMdx.flat,
    processor: eslintPluginMdx.createRemarkProcessor({
      lintCodeBlocks: false,
    }),
    rules: {
      ...eslintPluginMdx.flat.rules,
      "mdx/remark": "warn", // keep as warn (matches default)
      "mdx/code-blocks": "off",
      "react/jsx-no-undef": "off", // components are injected automatically from mdx-components.ts
      "react/no-unescaped-entities": "off",
      "@typescript-eslint/no-unused-vars": "off", // MDX files often import components that are used implicitly
    },
  },
  // Ignores (override Next.js defaults)
  globalIgnores([
    ".next/**",
    "out/**",
    "build/**",
    ".vercel/**",
    "next-env.d.ts",
    "node_modules/**",
    "lib/db/migrations/**",
  ]),
]);

export default eslintConfig;
