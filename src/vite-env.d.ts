/// <reference types="vite/client" />

interface ImportMetaEnv {
  /** Optional override, e.g. `2026` when that season has regular-season stats in the API */
  readonly VITE_MLB_SEASON?: string
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}
