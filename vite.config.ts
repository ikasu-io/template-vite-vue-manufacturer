import { copyFile, mkdir } from 'node:fs/promises'
import path from 'node:path'
import tailwindcss from '@tailwindcss/vite'
import vue from '@vitejs/plugin-vue'
import { defineConfig, type Plugin } from 'vite'
import { imagetools } from 'vite-imagetools'

// The pages besides the home page. Each gets its own copy of index.html in
// dist/, so a static host finds /impressum/ without any server rules; the
// router then shows the right page. dist/404.html does the same for
// addresses that don't exist.
const pages = ['impressum', 'datenschutz']

function pageCopies(): Plugin {
  return {
    name: 'page-copies',
    apply: 'build',
    async closeBundle() {
      const dist = path.resolve(import.meta.dirname, 'dist')
      for (const page of pages) {
        await mkdir(path.join(dist, page), { recursive: true })
        await copyFile(path.join(dist, 'index.html'), path.join(dist, page, 'index.html'))
      }
      await copyFile(path.join(dist, 'index.html'), path.join(dist, '404.html'))
    },
  }
}

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    tailwindcss(),
    // `import photo from './x.jpg?photo'` turns a photo into WebP files in
    // four widths and gives back { src, srcset, w, h } for <img>.
    imagetools({
      defaultDirectives: (url) =>
        url.searchParams.has('photo')
          ? new URLSearchParams({ w: '480;800;1200;1600', format: 'webp', quality: '70', as: 'img' })
          : new URLSearchParams(),
    }),
    pageCopies(),
  ],
  resolve: {
    alias: {
      '@': path.resolve(import.meta.dirname, './src'),
    },
  },
})
