import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import { VitePWA } from 'vite-plugin-pwa'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
    VitePWA({
      registerType: 'autoUpdate',
      includeAssets: ['favicon.ico', 'rin_logo.svg', 'robots.txt', 'apple-touch-icon.png'],
      manifest: {
        name: 'Rinhozo - Gamified Learning',
        short_name: 'Rinhozo',
        description: 'A gamified, multilingual learning companion that makes education accessible to every student.',
        theme_color: '#faf6f0',
        background_color: '#faf6f0',
        display: 'standalone',
        scope: '/',
        start_url: '/',
        icons: [
          {
            src: 'rin_logo.svg',
            sizes: 'any',
            type: 'image/svg+xml',
            purpose: 'any maskable'
          }
        ]
      }
    })
  ],
})
