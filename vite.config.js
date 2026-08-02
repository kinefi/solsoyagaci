import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import { visualizer } from 'rollup-plugin-visualizer'

export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
    visualizer({ 
      open: true, // Build bittiğinde tarayıcıda analiz sayfasını otomatik açar
      filename: 'stats.html', // Üretilecek rapor dosyasının adı
      gzipSize: true, // Gzip boyutlarını da gösterir
      brotliSize: true 
    })
  ],
  base: './'
})
