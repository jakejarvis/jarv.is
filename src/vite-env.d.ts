/// <reference types="vite-plus/client" />

declare module "*.mdx" {
  import type { ComponentType } from "react";
  const MDXComponent: ComponentType<Record<string, unknown>>;
  export default MDXComponent;
  export const frontmatter: Record<string, unknown>;
}

interface ImportMetaEnv {
  readonly VITE_BASE_URL: string;
  readonly VITE_SITE_LOCALE: string;
  readonly VITE_GITHUB_REPO: string;
  readonly VITE_ONION_DOMAIN?: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
