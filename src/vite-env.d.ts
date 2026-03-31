/// <reference types="vite/client" />
/// <reference types="vite-plugin-pwa/client" />

interface ImportMetaEnv {
  /** Google Cloud のブラウザ用キー（Maps JavaScript API / Places） */
  readonly VITE_GOOGLE_MAPS_API_KEY?: string
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}

declare const __APP_VERSION__: string
/** semver + ビルド日時ドット表記（例: 1.1.0.3.3.0.1.8.0.6） */
declare const __APP_VERSION_FULL__: string
