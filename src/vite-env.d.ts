/// <reference types="vite/client" />

interface ImportMetaEnv extends Readonly<Record<string, string | boolean | undefined>> {
  readonly VITE_API_ROOT: string;
  // 更多环境变量...
}

// eslint-disable-next-line no-unused-vars
interface ImportMeta {
  readonly env: ImportMetaEnv;
}
