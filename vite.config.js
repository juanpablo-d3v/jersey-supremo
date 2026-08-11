import { defineConfig } from 'vite';
import { resolve } from 'path';

export default defineConfig({
  base: '/jersey-supremo/',
  build: {
    outDir: 'dist',
    assetsDir: 'assets',
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'index.html'),
        prices: resolve(__dirname, 'prices.html'),
        sizes: resolve(__dirname, 'sizes.html')
      }
    }
  }
});