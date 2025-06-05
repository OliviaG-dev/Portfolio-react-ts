import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    outDir: 'dist',
    assetsDir: 'assets',
    rollupOptions: {
      output: {
        format: 'es',
        assetFileNames: 'assets/[name][extname]',
      },
    },
    target: 'es2015',
    minify: false,
    sourcemap: true,
  },
  publicDir: 'public',
});
