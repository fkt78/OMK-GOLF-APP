import { readFileSync } from 'node:fs'
import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { VitePWA } from 'vite-plugin-pwa'

const dir = dirname(fileURLToPath(import.meta.url))
const pkg = JSON.parse(readFileSync(join(dir, 'package.json'), 'utf-8')) as { version: string }

/**
 * ビルド日時をドット区切りで付与（例: 3月30日18:06 → 3.3.0.1.8.0.6）
 * 先頭は package の semver、その後ろがビルド時点のローカル日時
 */
function dotBuildStamp(d = new Date()): string {
  const month = d.getMonth() + 1
  const dayStr = String(d.getDate()).padStart(2, '0')
  const hStr = String(d.getHours()).padStart(2, '0')
  const mStr = String(d.getMinutes()).padStart(2, '0')
  return `${month}.${dayStr[0]}.${dayStr[1]}.${hStr[0]}.${hStr[1]}.${mStr[0]}.${mStr[1]}`
}

const appVersion = pkg.version ?? '0.0.0'
const appVersionFull = `${appVersion}.${dotBuildStamp()}`

export default defineConfig({
  plugins: [
    react(),
    VitePWA({
      registerType: 'prompt',          // 更新時にユーザーに確認プロンプトを表示
      includeAssets: ['golf-icon.svg', 'icon-192.png', 'icon-512.png', 'apple-touch-icon.png'],
      manifest: {
        name: 'Golf Stats Pro',
        short_name: 'GolfStats',
        description: 'プロ級スタッツでゴルフスコアを管理・分析',
        theme_color: '#0f3e21',
        background_color: '#051f0e',
        display: 'standalone',
        orientation: 'portrait',
        start_url: '/',
        icons: [
          {
            src: 'icon-192.png',
            sizes: '192x192',
            type: 'image/png',
            purpose: 'any',
          },
          {
            src: 'icon-512.png',
            sizes: '512x512',
            type: 'image/png',
            purpose: 'any',
          },
          {
            src: 'icon-512.png',
            sizes: '512x512',
            type: 'image/png',
            purpose: 'maskable',
          },
        ],
      },
      workbox: {
        globPatterns: ['**/*.{js,css,html,svg,png,ico,woff2}'],
        // キャッシュ戦略: ネットワーク優先（常に最新版を確認）
        navigateFallback: 'index.html',
        navigateFallbackDenylist: [/^\/api/],
        runtimeCaching: [
          {
            urlPattern: /^https:\/\/.*\.googleapis\.com\/.*/i,
            handler: 'NetworkFirst',
            options: { cacheName: 'google-apis', networkTimeoutSeconds: 10 },
          },
        ],
      },
    }),
  ],
  define: {
    __APP_VERSION__: JSON.stringify(appVersion),
    __APP_VERSION_FULL__: JSON.stringify(appVersionFull),
  },
})
