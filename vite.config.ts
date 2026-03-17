import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';
import path from 'path';

export default defineConfig({
  base: '/dk-employee-list-/',
  plugins: [react()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, '.'),
      '@tokens': path.resolve(__dirname, 'tokens'),
    },
  },
  build: {
    outDir: 'docs',
  },
});
