import contentCollections from "@content-collections/vite";
import babel from "@rolldown/plugin-babel";
import tailwindcss from "@tailwindcss/vite";
import { devtools } from "@tanstack/devtools-vite";
import { tanstackStart } from "@tanstack/react-start/plugin/vite";
import react, { reactCompilerPreset } from "@vitejs/plugin-react";
import { defineConfig } from "vite-plus";

export default defineConfig({
  fmt: {
    "sortImports": {
      "groups": [
        "builtin",
        "external",
        ["internal", "subpath"],
        ["parent", "sibling", "index"],
        "style",
        "unknown"
      ],
      "internalPattern": ["@/"],
      "newlinesBetween": true,
      "order": "asc"
    },
    "sortTailwindcss": {
      "attributes": ["className"],
      "functions": ["cn", "clsx", "cva"]
    },
    "overrides": [
      {
        "files": ["**/*.json", "**/*.jsonc"],
        "options": {
          "trailingComma": "none"
        }
      }
    ],
    "ignorePatterns": ["dist", "node_modules", "pnpm-lock.yaml", "**/routeTree.gen.ts", "drizzle"]
  },
  lint: {
    "plugins": [
      "oxc",
      "eslint",
      "typescript",
      "react",
      "import",
      "unicorn"
    ],
    "categories": {
      "correctness": "error",
      "suspicious": "warn",
      "perf": "warn"
    },
    "rules": {
      "import/no-named-as-default-member": "off",
      "import/no-unassigned-import": "off",
      "no-await-in-loop": "off",
      "no-console": "off",
      "no-new": "off",
      "no-unused-vars": "off",
      "oxc/no-barrel-file": "off",
      "react/no-unknown-property": "off",
      "react/react-in-jsx-scope": "off",
      "react/style-prop-object": "off",
      "typescript/no-unused-vars": "warn",
      "unicorn/consistent-function-scoping": "off",
      "unicorn/filename-case": "off",
      "unicorn/no-array-sort": "off",
      "unicorn/no-null": "off"
    },
    "ignorePatterns": [
      "dist",
      "node_modules",
      "**/routeTree.gen.ts",
      "drizzle"
    ],
    "options": {
      "typeAware": true,
      "typeCheck": true
    }
  },
  server: {
    host: "0.0.0.0",
    port: 3000,
  },
  resolve: {
    tsconfigPaths: true,
  },
  plugins: [
    devtools(),
    // cloudflare({ viteEnvironment: { name: "ssr" } }),
    tailwindcss(),
    tanstackStart(),
    react(),
    babel({
      presets: [reactCompilerPreset()],
    }),
    contentCollections(),
  ],
});
