/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_BASE_URL: string;
  readonly VITE_SITE_LOCALE: string;
  readonly VITE_GITHUB_REPO: string;
  readonly VITE_GITHUB_USERNAME: string;
  /** Set at build time when deploying to Vercel, where `/_vercel/image` exists (see vite.config.ts). */
  readonly VITE_VERCEL_IMAGES: boolean;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
