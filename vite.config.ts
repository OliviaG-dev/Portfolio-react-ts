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
        manualChunks: undefined,
        format: 'es',
        generatedCode: {
          preset: 'es2015',
        },
      },
    },
    target: 'es2015',
    minify: 'esbuild',
    sourcemap: true,
  },
});
