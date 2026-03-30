import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { VitePWA } from 'vite-plugin-pwa'

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
    // package.json のバージョンをアプリ内で使えるようにする
    __APP_VERSION__: JSON.stringify(process.env.npm_package_version),
  },
})
