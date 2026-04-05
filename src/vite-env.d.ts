/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_BASE_URL: string;
  readonly VITE_SITE_LOCALE: string;
  readonly VITE_GITHUB_REPO: string;
  readonly VITE_ONION_DOMAIN?: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
